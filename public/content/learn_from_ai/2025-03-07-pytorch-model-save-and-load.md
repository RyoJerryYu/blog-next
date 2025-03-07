---
created_at: 2025-03-07 13:00:00
updated_at: 2025-03-07 13:00:00
title: PyTorch 模型的保存与加载机制详解
tags:
  - Deep Learning
  - PyTorch
  - Model Management
license: true
---

> 本文为与 DeepSeek 对话记录，深入探讨 PyTorch 中模型的保存和加载机制，包括不同的保存方式、最佳实践以及常见问题的解决方案。

# Q: PyTorch 中所谓的保存模型/加载模型，指的是保存/加载什么？是 state_dict 吗？

> think
>
> 嗯，我现在要弄清楚 PyTorch 中保存和加载模型到底是怎么回事。用户问是不是保存和加载 state_dict，我需要仔细想一想这个问题。
>
> 首先，我记得在 PyTorch 里训练模型的时候，模型的可学习参数，比如各层的权重和偏置，是存放在模型的 parameters 中的。而 state_dict 应该是一个保存这些参数的东西。对，每个 torch.nn.Module 都有 state_dict，它是一个字典，将每个层映射到对应的参数张量。
>
> 那保存模型的时候，有两种常见的方法。一种是直接保存整个模型，使用 torch.save(model, 'model.pth')。这样的话，保存的是整个模型对象，包括结构定义和参数。不过这种方法可能有缺点，比如当模型定义所在的文件路径变化时，加载的时候可能会找不到类定义，导致错误。所以通常更推荐另一种方法，就是只保存 state_dict，这样需要的时候再加载到一个定义好的模型结构中。
>
> 所以用户的问题是说保存模型是不是保存 state_dict，对吧？是的，通常最佳做法是保存 state_dict，而不是整个模型对象。因为 state_dict 只包含参数，不包含模型结构，这样在加载的时候更灵活。比如，当你想在不同项目中使用同一个模型参数，或者模型类有修改时，加载 state_dict 会更方便。
>
> 那加载的时候，就需要先实例化模型，然后用 load_state_dict 方法加载参数。比如：
>
> model = MyModelClass(\*args, \*\*kwargs)
>
> model.load_state_dict(torch.load('model.pth'))
>
> 这样参数就被正确加载到模型里了。而如果保存的是整个模型，加载的时候可以直接用 model = torch.load('model.pth')，但这时候模型类必须在当前作用域可访问，否则会出错。
>
> 所以总结一下，保存模型通常指的是保存 state_dict，而加载模型就是加载这个 state_dict 到已经定义好的模型结构中。当然，PyTorch 也允许保存整个模型，但不够灵活，所以推荐用 state_dict 的方式。
>
> 另外，可能还有其他需要保存的内容，比如优化器的 state_dict，这样在恢复训练的时候可以接着之前的优化器状态继续训练。这时候保存的 checkpoint 可能包括 model_state_dict、optimizer_state_dict、epoch、loss 等信息。加载的时候需要分别处理这些部分。
>
> 但用户的问题主要是关于保存和加载模型本身，所以核心答案应该是 state_dict。不过要说明保存整个模型的情况也存在，但 state_dict 更推荐。所以回答的时候应该涵盖这两种情况，但强调 state_dict 是更常用的方法。

在 PyTorch 中，保存和加载模型的**核心是 `state_dict`**，但具体操作可以灵活选择。以下是详细说明：

---

### 1. **`state_dict` 是什么？**

- **`state_dict`** 是一个 Python 字典对象，它将模型的每一层（如卷积层、全连接层等）映射到对应的参数张量（权重和偏置）。
- 例如，一个简单的神经网络可能包含：
  ```python
  model.state_dict() = {
      'conv1.weight': tensor(...),
      'conv1.bias': tensor(...),
      'fc1.weight': tensor(...),
      'fc1.bias': tensor(...),
      ...
  }
  ```
- **优化器**（如 `torch.optim.SGD`）也有自己的 `state_dict`，保存优化器的状态（如动量缓冲等）。

---

### 2. **保存模型的两种方式**

#### **方式 1：仅保存 `state_dict`（推荐）**

- **代码示例**：
  ```python
  torch.save(model.state_dict(), 'model_weights.pth')
  ```
- **优点**：
  - 文件体积小，只保存参数，不保存模型结构。
  - 加载灵活：需先实例化模型结构，再加载参数。
  - 避免因代码变更（如类名修改）导致的加载失败。

#### **方式 2：保存整个模型（不推荐）**

- **代码示例**：
  ```python
  torch.save(model, 'entire_model.pth')
  ```
- **缺点**：
  - 文件体积大，包含模型结构和参数。
  - 依赖原始代码环境（模型类的定义必须存在），否则加载时会报错。

---

### 3. **加载模型的对应方法**

#### **加载 `state_dict`（需先构建模型结构）**

```python
model = MyModelClass()  # 必须与保存时的模型结构一致
model.load_state_dict(torch.load('model_weights.pth'))
model.eval()  # 切换到推理模式（关闭 dropout 等）
```

#### **加载整个模型（直接使用）**

```python
model = torch.load('entire_model.pth')
model.eval()
```

---

### 4. **实际场景中的最佳实践**

- **保存训练检查点（Checkpoint）**：
  通常需要保存 `state_dict` 之外的信息（如优化器状态、训练步数等）：

  ```python
  checkpoint = {
      'model_state_dict': model.state_dict(),
      'optimizer_state_dict': optimizer.state_dict(),
      'epoch': 100,
      'loss': loss,
  }
  torch.save(checkpoint, 'checkpoint.pth')
  ```

- **加载检查点**：
  ```python
  checkpoint = torch.load('checkpoint.pth')
  model.load_state_dict(checkpoint['model_state_dict'])
  optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
  epoch = checkpoint['epoch']
  ```

---

### 5. **关键总结**

- **保存模型**：本质是保存模型的 `state_dict`（推荐），但也可以保存整个模型。
- **加载模型**：
  - 若保存的是 `state_dict`，需先实例化模型结构，再加载参数。
  - 若保存的是整个模型，直接加载但需保证代码兼容性。
- **灵活性**：使用 `state_dict` 更安全、更灵活，适合跨项目或模型结构可能变化的场景。

# Q: model 的 config 又是什么东西？是超参吗？

> think
>
> 嗯，用户之前问过 PyTorch 中保存和加载模型的概念，现在又接着问"model 的 config 是什么东西？是超参吗？"我需要仔细分析这个问题，确保理解用户的真实需求。
>
> 首先，用户已经了解 state_dict，现在转向模型配置（config）。可能他们在实际项目中遇到了需要保存或管理模型结构的情况，或者在阅读代码时遇到了 config 这个术语。用户想知道 config 具体指什么，是否包括超参数。
>
> 接下来，我需要明确"model config"的定义。在机器学习中，模型配置通常指的是定义模型结构的参数，比如神经网络的层数、每层的神经元数量、激活函数类型等。而超参数可能包括学习率、批量大小、优化器类型等训练过程中的设置。但有时候这两者之间的界限并不严格，特别是当某些结构参数也被视为超参数时。
>
> 用户可能混淆了模型配置和超参数，需要区分这两者。需要举例说明，比如在 Transformer 模型中，config 可能包含隐藏层大小、头数等，而超参数则是训练时的设置。但有时，例如在 HuggingFace 的库中，模型配置类（如 BertConfig）确实包含了模型结构的所有参数，这可能让用户产生疑问。
>
> 另外，用户可能想知道为什么需要单独保存 config。可能他们在保存模型时，除了 state_dict 之外，还需要保存模型结构的信息，以便重新实例化模型。比如，如果只保存 state_dict，加载时需要先有模型类的定义和 config 参数，才能正确创建模型实例，然后加载权重。
>
> 需要解释 config 的作用：它定义了模型的结构，是重建模型实例的必要信息。与超参数不同，config 主要涉及模型架构，而超参数涉及训练过程。但有些情况下，两者可能有重叠，比如学习率可能被包含在训练配置中，而层数在模型配置中。
>
> 还需要考虑用户可能的实际应用场景。比如，使用 HuggingFace 的 Transformers 库时，模型配置被明确分离，用户需要保存 config.json 和 model.bin。这时候，config 保存模型结构，model.bin 保存 state_dict。用户可能在这种情况下遇到 config 的概念，需要解释这种设计的原因和好处。
>
> 此外，用户可能想知道如何管理 config，比如使用 YAML 或 JSON 文件来存储模型结构参数，方便版本控制和实验复现。这也是为什么分开保存 config 和 state_dict 更灵活，因为修改结构时只需调整 config 而不影响训练好的权重。
>
> 最后，要确保回答结构清晰，分点说明，给出代码示例，并比较 config 与超参数的区别和联系。同时，注意用户可能的技术水平，避免使用过于专业的术语，保持解释的易懂性。

在机器学习中，**模型的 `config`（配置）** 通常指**定义模型结构的所有参数**，而超参（Hyperparameters）更多指**控制训练过程的参数**。这两者有时会有重叠，但核心区别在于作用对象。以下是详细解释：

---

### 1. **什么是模型的 `config`？**

- **模型配置**（Model Configuration）是定义**模型结构**的一组参数，例如：

  - 神经网络的层数、每层的神经元数量
  - 卷积核大小、步长（Stride）、填充（Padding）
  - 激活函数类型（如 ReLU、Sigmoid）
  - 注意力机制的头数（如 Transformer 中的 `num_heads`）
  - 词嵌入维度（如 NLP 模型中的 `hidden_size`）

- **示例**（以 Transformer 模型为例）：
  ```python
  config = {
      "num_layers": 12,          # Transformer 层数
      "hidden_size": 768,         # 隐藏层维度
      "num_attention_heads": 12,  # 注意力头数
      "intermediate_size": 3072,  # FeedForward 层维度
      "vocab_size": 30522,        # 词表大小
  }
  ```

---

### 2. **模型 `config` 与超参数的区别**

| **类别**     | **模型配置（Config）**                 | **超参数（Hyperparameters）**                                  |
| ------------ | -------------------------------------- | -------------------------------------------------------------- |
| **作用对象** | 模型结构                               | 训练过程                                                       |
| **典型参数** | 层数、维度、注意力头数、卷积核大小     | 学习率、批量大小（Batch Size）、优化器类型、训练轮数（Epochs） |
| **保存目的** | 重建模型结构（如加载 `state_dict` 前） | 复现训练过程（如调参、实验对比）                               |
| **修改频率** | 低频（模型结构稳定后很少改动）         | 高频（需反复调整优化）                                         |

---

### 3. **为什么需要单独管理 `config`？**

- **场景 1：重建模型**  
  若仅保存 `state_dict`（模型权重），加载时必须**先根据 `config` 重建模型结构**，才能加载权重：

  ```python
  # 保存
  torch.save(model.state_dict(), "model_weights.pth")
  with open("model_config.json", "w") as f:
      json.dump(config, f)

  # 加载
  with open("model_config.json", "r") as f:
      config = json.load(f)
  model = MyModel(**config)  # 根据 config 实例化模型
  model.load_state_dict(torch.load("model_weights.pth"))
  ```

- **场景 2：版本控制与实验复现**  
  将 `config` 保存为 JSON/YAML 文件，便于记录不同模型结构的实验效果。

- **场景 3：共享模型**  
  开源社区常用模式（如 HuggingFace Transformers）：
  - `config.json`：定义模型结构
  - `pytorch_model.bin`：保存 `state_dict`

---

### 4. **`config` 与超参数的重叠情况**

某些参数可能同时影响模型结构和训练，例如：

- **Dropout 比率**：既是模型结构的一部分，也被视为超参数。
- **词嵌入维度**：影响模型结构，但可能因训练资源调整（如显存不足时调小维度）。

此时，可以**将两者统一管理**，但建议分开存储：

```python
# 统一配置文件（config.yaml）
model:
  num_layers: 12
  hidden_size: 768
training:
  learning_rate: 1e-4
  batch_size: 32
```

---

### 5. **实际代码示例**

#### 定义模型时使用 `config`：

```python
class TransformerModel(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.embedding = nn.Embedding(config["vocab_size"], config["hidden_size"])
        self.layers = nn.ModuleList([TransformerBlock(config) for _ in range(config["num_layers"])])
        # ...

# 初始化模型
config = {"vocab_size": 30000, "hidden_size": 512, "num_layers": 6}
model = TransformerModel(config)
```

#### 保存与加载完整模型（含结构和权重）：

```python
# 保存（不推荐，但某些场景需要）
full_model = {"config": config, "state_dict": model.state_dict()}
torch.save(full_model, "full_model.pth")

# 加载
loaded = torch.load("full_model.pth")
model = TransformerModel(loaded["config"])
model.load_state_dict(loaded["state_dict"])
```

---

### 6. **总结**

- **模型 `config`**：定义模型结构的参数（如层数、维度），是**重建模型**的必需信息。
- **超参数**：控制训练过程的参数（如学习率、批量大小），影响模型如何学习。
- **最佳实践**：
  - 始终保存 `config`（如 JSON 文件），确保模型可复现。
  - 分开管理模型配置和训练超参数，避免混淆。

> [!info] 亮曰
>
> - Config 主要是定义模型结构。会根据 Config 决定有多少层等。
> - 超参主要是训练过程中的学习率、 Epochs 等，复现训练过程时需要，但与模型结构无关，只与训练过程有关。

# Q: 所谓"权重"就是指 state_dict 中的内容吗？

> think
>
> 嗯，用户问："所谓'权重'就是指 state_dict 中的内容吗？"这个问题看起来是想确认 PyTorch 中的权重和 state_dict 之间的关系。首先，我需要回顾一下之前的对话，确保回答的一致性。
>
> 之前已经解释了 state_dict 是保存模型参数的核心，里面包含了各层的权重和偏置。用户可能现在对"权重"这个术语的具体指向有疑问，需要明确权重是否等同于 state_dict 中的所有内容。
>
> 首先，我应该明确"权重"在机器学习中的定义。通常，权重指的是模型中的可学习参数，比如线性层中的权重矩阵和偏置向量。而 state_dict 不仅包括这些权重，还可能包括其他参数，比如 BatchNorm 层的均值和方差，或者优化器的状态。因此，state_dict 的内容可能比单纯的"权重"更广泛。
>
> 接下来，需要区分 state_dict 中的不同部分。模型和优化器都有自己的 state_dict。模型的 state_dict 包含各层的参数，而优化器的 state_dict 包含优化器的状态，如动量缓存等。用户的问题可能集中在模型的 state_dict 中的权重部分，而是否包括其他参数需要澄清。
>
> 另外，用户可能对如何正确保存和加载模型有更深入的理解需求。比如，保存 state_dict 时，是否只保存了权重，还是还有其他必要的参数？需要说明 state_dict 中的内容对于模型重建的重要性，以及权重在其中的角色。
>
> 可能用户在实际操作中遇到了问题，比如加载模型时结构不匹配，或者参数未正确加载，因此需要明确 state_dict 中的内容。需要举例说明，比如一个简单的线性模型，展示其 state_dict 中的键值对，明确哪些是权重，哪些是偏置，或者其他类型的参数。
>
> 还需要考虑用户可能的误解，比如认为 state_dict 仅包含权重，而忽略了其他必要的参数，导致模型无法正确运行。因此，强调 state_dict 包含所有必要的参数，而权重是其中的一部分，但还有其他如偏置、BatchNorm 的参数等。
>
> 此外，用户可能关心如何仅保存或操作权重，比如迁移学习中的部分参数加载。这时候需要说明如何从 state_dict 中选择性地提取或加载特定的权重部分。
>
> 总结来说，回答需要明确以下几点：
>
> 1. 权重是模型中的可学习参数，如线性层的权重矩阵。
>
> 2. state_dict 包含模型的所有参数，包括权重、偏置以及其他层特定的参数。
>
> 3. 模型的 state_dict 与优化器的 state_dict 不同，后者包含优化器状态。
>
> 4. 正确加载模型需要确保 state_dict 的结构与当前模型结构匹配。
>
> 5. 示例说明 state_dict 中的具体内容，帮助用户直观理解。
>
> 同时，要注意用词准确，避免混淆，比如"参数"和"权重"的区别，确保用户能清晰理解两者的包含关系。可能还需要提到在保存和加载时的最佳实践，比如如何结合 config 来重建模型结构，再加载 state_dict 中的参数，以确保模型的正确性。
>
> 最后，检查是否有遗漏点，比如是否提到 eval()模式的影响，或者训练/推理时加载参数的注意事项，但根据问题范围，可能不需要展开，除非用户有进一步的问题。

在 PyTorch 中，**"权重"确实是 `state_dict` 中的核心内容**，但 `state_dict` 包含的信息可能比"权重"更广泛。以下是详细解释：

---

### 1. **"权重"是什么？**

- **权重（Weights）** 是模型中**可学习的参数**，例如：
  - 全连接层（`nn.Linear`）中的权重矩阵（`weight`）和偏置（`bias`）。
  - 卷积层（`nn.Conv2d`）的卷积核参数。
  - 嵌入层（`nn.Embedding`）的词向量矩阵。
- 这些参数通过反向传播和优化器（如 SGD、Adam）在训练过程中逐步更新。

---

### 2. **`state_dict` 中的内容**

`state_dict` 是 PyTorch 中模型或优化器的**状态字典**，具体包含：

- **对模型而言**：
  - 所有权重（`weight`）、偏置（`bias`）。
  - 其他**与层相关的参数**，例如：
    - `BatchNorm` 层的 `running_mean` 和 `running_var`（在推理时使用的均值和方差）。
    - `LSTM` 或 `GRU` 中的隐藏状态缓存（如果模型设计时显式存储了这些状态）。
  ```python
  # 示例：一个简单模型的 state_dict
  model = nn.Sequential(
      nn.Linear(10, 20),
      nn.ReLU(),
      nn.BatchNorm1d(20)
  )
  print(model.state_dict().keys())
  # 输出：
  # ['0.weight', '0.bias', '2.weight', '2.bias', '2.running_mean', '2.running_var', '2.num_batches_tracked']
  ```
- **对优化器而言**：
  - 优化器的状态（如动量缓存、历史梯度等）。
  ```python
  optimizer = torch.optim.Adam(model.parameters())
  print(optimizer.state_dict().keys())
  # 输出：
  # ['state', 'param_groups']
  ```

---

### 3. **"权重"与 `state_dict` 的关系**

- **`state_dict` 包含权重，但不仅限于权重**：
  - 权重是 `state_dict` 中的一部分（如 `conv1.weight`, `fc.bias`）。
  - `state_dict` 还可能包含**非可学习的参数**（如 `BatchNorm` 的统计量 `running_mean`）。
  - 对于复杂模型（如 Transformer），还可能包含位置编码、注意力掩码等参数。
- **总结**：
  - **权重是 `state_dict` 的核心内容**，但 `state_dict` 是更全面的模型状态表示。

---

### 4. **为什么需要 `state_dict` 而不仅仅是权重？**

- **完整恢复模型状态**：
  如果仅保存权重，忽略 `BatchNorm` 的 `running_mean` 等参数，在推理时会导致统计量错误，影响模型性能。
- **兼容性**：
  加载模型时需确保 `state_dict` 的键（如层名称）与当前模型结构严格匹配，否则会报错 `Missing keys` 或 `Unexpected keys`。
- **灵活性**：
  可以手动修改 `state_dict`，例如迁移学习中仅加载部分层的权重。

---

### 5. **操作 `state_dict` 的常见场景**

#### **(1) 查看模型权重**

```python
for name, param in model.named_parameters():
    print(f"层名: {name}, 参数形状: {param.shape}")
```

#### **(2) 选择性加载部分权重（迁移学习）**

```python
pretrained_dict = torch.load('pretrained.pth')
model_dict = model.state_dict()

# 筛选出名称和形状匹配的权重
pretrained_dict = {
    k: v for k, v in pretrained_dict.items()
    if k in model_dict and v.shape == model_dict[k].shape
}
model_dict.update(pretrained_dict)
model.load_state_dict(model_dict)
```

#### **(3) 手动修改权重**

```python
# 将第一层卷积的权重置零
with torch.no_grad():
    model.conv1.weight.copy_(torch.zeros_like(model.conv1.weight))
```

---

### 6. **总结**

- **权重**是模型的可学习参数，是 `state_dict` 的核心内容。
- **`state_dict`** 是模型状态的完整表示，包括：
  - 所有权重、偏置。
  - 非可学习的运行时参数（如 `BatchNorm` 的统计量）。
- **最佳实践**：
  - 保存模型时使用 `torch.save(model.state_dict(), ...)`。
  - 加载时需先构建相同结构的模型，再调用 `model.load_state_dict()`。
  - 若需调整模型结构，可选择性加载匹配的权重。

> [!info] 亮曰
>
> state_dict 包括 Parameter 与 Buffer ，模型的可学习参数——**权重**主要指其中的 Parameter 。
