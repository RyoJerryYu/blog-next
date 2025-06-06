---
created_at: 2024-11-29 10:00:00+08:00
updated_at: 2024-11-29 10:00:00+08:00
title: 深度学习模型文件格式对比：pth、safetensor 与 onnx
license: true
tags:
  - PyTorch
  - ONNX
  - 深度学习
  - 模型部署
  - 学习笔记
---

> 本页面介绍了三种机器学习模型文件格式：.pth、.safetensor 和 .onnx。主要内容包括每种格式的定义、保存的内容、用途以及它们之间的区别和转换方法。

## pytorch 保存的 .pth 文件里都保存了些什么东西？

PyTorch 中的`.pth`文件通常用于保存模型的权重（parameters）和训练过程中的优化器状态（optimizer state）。具体来说，一个`.pth`文件可能包含以下内容：

1. **模型状态字典（Model state dictionary）**：
   - 这是`.pth`文件中最主要的部分，它包含了模型的所有权重（即神经网络的参数），包括卷积层的滤波器、全连接层的权重和偏置等。
   - 状态字典是一个简单的 Python 字典对象，其键是层的名字，值是相应的参数张量。
2. **优化器状态字典（Optimizer state dictionary）**：
   - 当保存模型时，通常也会保存优化器的状态，这样可以在模型训练中断后，从上次停止的地方继续训练。
   - 优化器状态字典通常包含每个参数的梯度、动量（momentum）和其他与优化器相关的状态信息（例如 Adam 优化器的矩估计）。
3. **其他可选信息**：
   - 有时候，`.pth`文件可能还会包含其他辅助信息，比如训练的损失值、额外的元数据或者批处理大小等，但这些信息不是必须的。
     以下是一个简单的例子，展示如何在 PyTorch 中保存和加载`.pth`文件：

```python
# 保存模型和优化器状态
torch.save({
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
    ...
}, 'model.pth')
# 加载模型和优化器状态
checkpoint = torch.load('model.pth')
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']
loss = checkpoint['loss']
...
```

在这个例子中，`model`是你要保存的模型对象，`optimizer`是训练该模型使用的优化器。通过`torch.save`函数，你可以将模型的状态字典和优化器的状态字典保存到文件中。之后，可以使用`torch.load`函数来恢复这些状态，以便继续训练或者进行推理。

## .safetensor 文件中又保存了什么东西？

`.safetensor` 文件格式是由 Hugging Face 的 Safety Checker 工具引入的，它是为了在模型推理时提供一个额外的安全层。`.safetensor` 文件中保存的内容主要包括：

1. **模型权重**：
   - 这是最核心的部分，与 PyTorch 的 `.pth` 文件类似，`.safetensor` 文件也保存了模型的权重，即神经网络中的参数。
2. **元数据**：
   - `.safetensor` 文件包含了一些元数据，这些数据描述了模型的架构、权重形状、数据类型等信息，这样可以在加载模型时进行验证和适配。
3. **安全性信息**：
   - `.safetensor` 文件可能会包含与模型安全性相关的信息，例如哪些层或参数可能需要特别的安全检查，以及可能的阈值设置等。
     具体来说，`.safetensor` 文件的内容结构可能如下：

- `weights`: 包含模型权重的字典，通常是以张量的形式存储。
- `metadata`: 包含模型的元数据，如版本号、架构信息等。
- `config`: 包含模型配置信息，如模型类型、类名等。
- `safety`: 包含模型安全性相关的信息。
  使用 `.safetensor` 文件的目的之一是为了确保在模型部署时能够进行有效的安全检查，特别是在处理生成型模型（如文本生成、图像生成等）时，可以防止生成不适当的内容。
  请注意，`.safetensor` 文件格式并不是 PyTorch 的标准保存格式，而是 Hugging Face 的特定实现。因此，它可能不如 `.pth` 文件那样被广泛使用。如果你在使用 Hugging Face 的模型和工具，可能会遇到 `.safetensor` 文件。在使用时，需要确保你的环境支持这种格式。

## .onnx 文件中又保存了什么信息？

`.onnx`（Open Neural Network Exchange）文件是一个开放格式，用于表示机器学习模型。它旨在提供一种标准的方式来表示深度学习模型，使得模型可以在不同的框架和工具之间进行转换和互操作。一个`.onnx`文件中通常包含以下信息：

1. **模型图（Model Graph）**：
   - 模型图定义了模型的计算流程，它由节点（nodes）和边（edges）组成。
   - 节点代表计算操作，如卷积、矩阵乘法、激活函数等。
   - 边代表节点之间的数据流，即张量（tensors）的流动。
2. **初始值（Initializers）**：
   - 初始值包含了模型的权重、偏置等参数的值。
   - 这些参数是在模型图执行之前就已经确定的。
3. **模型属性（Attributes）**：
   - 每个节点可能有与之关联的属性，这些属性定义了节点的具体行为，例如卷积操作中的步长（stride）和填充（padding）。
4. **输入和输出（Inputs and Outputs）**：
   - 定义了模型的输入和输出张量的名称、数据类型和形状。
   - 这有助于理解模型期望的输入格式以及它将产生的输出格式。
5. **元数据（Metadata）**：
   - 包括模型的名称、版本、作者、生产日期等信息。
   - 这些信息有助于模型的追踪和管理。
6. **优化信息（Optimization Information）**（可选）：
   - 一些`.onnx`文件可能包含用于优化模型执行的额外信息，如融合操作或特定硬件上的优化指令。
     `.onnx`文件的结构大致如下：

- `ir_version`: ONNX 格式的版本号。
- `opset_import`: 模型使用的操作集版本。
- `producer_name`: 生成该 ONNX 模型的工具或库的名称。
- `producer_version`: 生成该 ONNX 模型的工具或库的版本。
- `graph`: 包含模型图的结构和属性。
  - `node`: 计算节点列表。
  - `input`: 输入列表。
  - `output`: 输出列表。
  - `initializer`: 初始化参数列表。
  - `value_info`: 提供额外的张量信息。
    使用`.onnx`文件，可以轻松地将模型从 PyTorch、TensorFlow、Caffe2 等框架转换到 ONNX 格式，然后再部署到不同的推理引擎或硬件平台上，例如使用 ONNX Runtime 进行推理。这种格式提高了模型的便携性和互操作性。

## 简述 .pth ， .safetensor ， .onnx 保存的信息中，有哪些是相同的？有哪些有区别？

.pth, .safetensor, 和 .onnx 文件格式都用于保存机器学习模型的相关信息，但它们的设计目的、兼容性和包含的具体内容有所不同。以下是它们之间相同点和区别的概述：
**相同点：**

1. **模型参数/权重**：
   - 所有三种格式都保存了模型的参数或权重，这些是训练过程中学习到的数值，对于模型的预测能力至关重要。
2. **元数据**：
   - 它们都可能包含一些元数据，如模型的版本、创建日期或其他描述性信息，尽管具体的元数据内容和格式可能有所不同。
     **区别：**
3. **格式和兼容性**：
   - `.pth` 是 PyTorch 的原生格式，专门用于保存和加载 PyTorch 模型的状态字典，包括模型权重和优化器状态。
   - `.safetensor` 是 Hugging Face 的 Safety Checker 工具使用的格式，除了模型权重，还包含了安全性相关的信息。
   - `.onnx` 是一个开放的、跨框架的格式，用于在不同的深度学习框架之间交换模型，不仅包含模型结构和参数，还定义了模型计算图。
4. **包含内容**：
   - `.pth` 文件通常包含模型的状态字典和优化器的状态字典，以及可选的其他训练信息（如损失值、迭代次数等）。
   - `.safetensor` 文件包含模型权重、元数据以及与模型安全性相关的信息。
   - `.onnx` 文件包含模型计算图、节点定义、边的连接、初始值（模型权重）、输入输出定义以及可选的优化信息。
5. **使用场景**：
   - `.pth` 文件主要用于 PyTorch 模型的训练和推理。
   - `.safetensor` 文件用于在 Hugging Face 的生态系统中进行模型的安全检查。
   - `.onnx` 文件用于模型在不同框架之间的转换和部署，特别是在需要跨平台或硬件优化的场景中。
6. **开放性和互操作性**：
   - `.onnx` 格式的设计重点在于开放性和互操作性，使其成为不同框架和工具之间模型交换的桥梁。
   - `.pth` 和 `.safetensor` 更专注于特定框架或工具链内的使用。
     总结来说，这三种格式都用于保存模型权重，但它们在格式兼容性、包含的额外信息和使用场景上存在明显差异。`.onnx` 格式更加开放和通用，而 `.pth` 和 `.safetensor` 更专注于特定的框架或应用需求。

## 简述 .pth ， .safetensor ， .onnx 保存的信息中有哪些是相同的？保存的信息中又有哪些有区别？

.pth、.safetensor 和.onnx 文件格式虽然都是为了保存机器学习模型的相关信息，但它们在保存的内容上存在相同点和差异。
**相同点：**

1. **模型参数/权重**：这三种文件格式都会保存模型的参数或权重，这些权重是模型在训练过程中学习到的，对模型的预测能力至关重要。
2. **元数据**：它们都可能包含一些元数据，例如模型的版本、创建日期或其他描述性信息，尽管具体的元数据和格式可能因文件格式而异。
   **区别：**
3. **格式和兼容性**：
   - .pth 文件是 PyTorch 的原生格式，主要用于保存和加载 PyTorch 模型的状态字典，包括模型权重和优化器状态。
   - .safetensor 文件是 Hugging Face 的 Safety Checker 工具使用的格式，除了模型权重，还包括安全性相关的信息。
   - .onnx 文件是一种开放的、跨框架的格式，用于在不同深度学习框架之间交换模型，包含模型结构和参数以及模型计算图。
4. **包含内容**：
   - .pth 文件通常包含模型的状态字典和优化器的状态字典，可能还包括其他训练信息，如损失值、迭代次数等。
   - .safetensor 文件包含模型权重、元数据以及与模型安全性相关的信息。
   - .onnx 文件包含模型计算图、节点定义、边的连接、初始值（模型权重）、输入输出定义以及可选的优化信息。
5. **使用场景**：
   - .pth 文件主要用于 PyTorch 模型的训练和推理。
   - .safetensor 文件用于 Hugging Face 生态系统中的模型安全检查。
   - .onnx 文件用于模型在不同框架之间的转换和部署，特别是在需要跨平台或硬件优化的场景中。
6. **开放性和互操作性**：
   - .onnx 格式重点在于开放性和互操作性，便于不同框架和工具之间模型交换。
   - .pth 和.safetensor 文件更专注于特定框架或工具链内的使用。
     总结来说，这三种文件格式都保存模型权重，但在格式兼容性、包含的额外信息和使用场景上存在明显差异。.onnx 格式更开放和通用，而.pth 和.safetensor 则更专注于特定框架或应用需求。

## .pth ， .safetensor ， .onnx 三种格式，各自能否用于模型的 finetunning ？为什么？

.pth、.safetensor 和 .onnx 三种格式在模型微调（finetuning）方面的适用性各有不同，以下是各自的适用性分析：
**.pth 格式：**
.pth 文件可以用于模型的微调。原因如下：

- .pth 文件是 PyTorch 的原生格式，它保存了模型的状态字典，包括模型的权重和可选的优化器状态。
- 在微调过程中，可以加载 .pth 文件中的模型权重，然后根据新的数据集对模型进行进一步的训练。
- 如果 .pth 文件中包含了优化器状态，那么可以从中断点继续训练，这对于微调过程是有帮助的。
  **.safetensor 格式：**
  .safetensor 文件也可以用于模型的微调，但有一些限制：
- .safetensor 文件主要是由 Hugging Face 的 Safety Checker 工具使用的，它保存了模型权重和与安全性相关的信息。
- 虽然这个格式主要用于安全检查，但它仍然包含了模型权重，因此理论上可以用于微调。
- 但是，由于 .safetensor 文件格式可能不如 .pth 那样被广泛支持，因此在微调时可能需要额外的步骤来转换格式或加载权重。
  **.onnx 格式：**
  .onnx 文件在微调方面的适用性较低，原因如下：
- .onnx 文件是一个开放的、跨框架的格式，它不仅包含模型权重，还定义了模型计算图。
- 虽然 .onnx 格式支持在不同的框架之间转换模型，但它不是为了微调而设计的。计算图是固定的，不易于修改。
- 如果需要微调 .onnx 格式的模型，通常需要先将模型转换回原始框架（如 PyTorch 或 TensorFlow），然后再进行微调。
- 因此，直接在 .onnx 格式上进行微调通常不切实际，除非有特定的工具或库支持这种操作。
  总结来说，.pth 格式最适合用于 PyTorch 模型的微调，因为它直接与 PyTorch 的训练和推理流程兼容。.safetensor 格式也可以用于微调，但可能需要额外的步骤来处理。而 .onnx 格式通常不直接用于微调，需要转换为其他框架格式后才能进行微调。

## .pth ， .safetensor ， .onnx 三种格式，各自能否用于训练 LoRA ？为什么？

LoRA（Low-Rank Adaptation）是一种用于微调大型预训练模型的技术，它通过引入低秩分解来减少微调所需的参数数量，从而减少存储和计算需求。以下是关于 .pth、.safetensor 和 .onnx 格式在训练 LoRA 时的适用性分析：
**.pth 格式：**
.pth 文件可以用于训练 LoRA。原因如下：

- .pth 文件是 PyTorch 的原生格式，可以直接保存和加载模型的权重，包括 LoRA 引入的低秩矩阵。
- 在训练 LoRA 时，通常需要在原始预训练模型的基础上添加额外的参数（即低秩矩阵），这些参数可以在 PyTorch 中通过自定义层或修改现有层来实现。
- 由于 .pth 文件与 PyTorch 框架紧密集成，因此可以轻松地保存和加载 LoRA 的参数，并进行训练。
  **.safetensor 格式：**
  .safetensor 文件也可以用于训练 LoRA，但可能有一些限制：
- .safetensor 文件是为了提高模型使用的安全性而设计的，它保存了模型权重和其他与安全性相关的信息。
- 如果 LoRA 的参数被包含在 .safetensor 文件中，那么理论上可以用于训练。
- 然而，由于 .safetensor 文件格式可能不如 .pth 那样被广泛支持，因此在训练 LoRA 时可能需要额外的步骤来处理文件格式。
  **.onnx 格式：**
  .onnx 文件在训练 LoRA 方面通常不适用。原因如下：
- .onnx 文件定义了模型的计算图和权重，但它是一个静态的模型描述格式，不适合动态修改模型结构，如添加 LoRA 层。
- LoRA 需要在预训练模型的特定层中插入低秩矩阵，这通常需要对模型结构进行修改，而 .onnx 格式不支持这种修改。
- 如果需要使用 .onnx 文件中的模型来训练 LoRA，通常需要先将模型转换回 PyTorch 或其他支持动态图修改的框架，然后再进行训练。
  总结来说，.pth 格式最适合用于训练 LoRA，因为它与 PyTorch 框架紧密集成，支持动态图和自定义层的添加。.safetensor 格式在理论上也是可行的，但可能需要额外的处理步骤。而 .onnx 格式由于不支持动态修改模型结构，因此不适合直接用于训练 LoRA。

## pth ， safetensor ， onnx ，三种格式如何两两转换？

.pth、.safetensor 和 .onnx 文件格式之间的转换通常需要通过特定的工具和库来实现。以下是如何在这三种格式之间进行两两转换的概述：

### .pth 到 .safetensor 的转换

目前，并没有直接的标准工具来将 .pth 文件转换为 .safetensor 文件。但是，可以手动加载 .pth 文件中的权重，并将其保存为 .safetensor 格式。以下是一个示例步骤：

1. 使用 PyTorch 加载 .pth 文件。
2. 提取模型权重。
3. 使用 Hugging Face 的 `transformers` 库或其他相关工具将权重保存为 .safetensor 文件。

### .safetensor 到 .pth 的转换

同样地，将 .safetensor 文件转换为 .pth 文件也没有直接的转换工具。以下是手动转换的步骤：

1. 使用 Hugging Face 的 `transformers` 库或其他相关工具加载 .safetensor 文件。
2. 提取模型权重。
3. 使用 PyTorch 将权重保存为 .pth 文件。

### .pth 到 .onnx 的转换

PyTorch 提供了直接将模型转换为 .onnx 格式的工具：

```python
import torch
import torch.onnx
# 假设 model 是一个 PyTorch 模型
model = ...  # 加载或定义模型
# 假设输入是一个张量，其形状与模型输入兼容
input_sample = torch.randn(batch_size, channels, height, width)
# 将模型转换为 ONNX 格式
torch.onnx.export(model,               # 模型
                  input_sample,        # 模型输入（或一个包含输入的元组）
                  "model.onnx",       # 输出文件名
                  export_params=True,  # 是否导出参数
                  opset_version=10,    # ONNX 算子集版本
                  do_constant_folding=True,  # 是否执行常量折叠优化
                  input_names=['input'],   # 输入名
                  output_names=['output'], # 输出名
                  dynamic_axes={'input': {0: 'batch_size'},  # 动态轴
                                'output': {0: 'batch_size'}})
```

### .onnx 到 .pth 的转换

将 .onnx 文件转换为 .pth 文件通常不直接进行，因为 .onnx 文件包含了模型的结构信息，而 .pth 文件只包含权重。如果需要，可以重新创建 PyTorch 模型结构，然后加载 .onnx 文件中的权重：

1. 定义与 .onnx 文件对应的 PyTorch 模型结构。
2. 使用 `onnx.load` 加载 .onnx 文件。
3. 提取权重并将其加载到 PyTorch 模型中。

### .safetensor 到 .onnx 的转换

目前没有直接的方法将 .safetensor 文件转换为 .onnx 文件。如果需要，可以先将 .safetensor 文件转换为 .pth 文件，然后再按照上述方法将 .pth 文件转换为 .onnx 文件。

### .onnx 到 .safetensor 的转换

同样地，将 .onnx 文件转换为 .safetensor 文件也没有直接的转换工具。如果需要，可以先将 .onnx 文件转换为 .pth 文件，然后再将 .pth 文件转换为 .safetensor 文件。
在进行这些转换时，需要注意的是，转换过程中可能会丢失一些特定的信息，如优化器状态或模型配置，因此在转换后可能需要额外的步骤来确保模型的完整性和正确性。

## 我有一个从网络上下载的 .pth 文件 `001.pth` 。给我 Python 代码，将其转换为 onnx 格式。

要将一个 `.pth` 文件转换为 `.onnx` 格式，你需要首先加载 `.pth` 文件中的模型，然后使用 PyTorch 的 `torch.onnx.export` 函数来进行转换。以下是一个 Python 代码示例，展示了如何进行这一转换过程。假设你已经有了对应的 PyTorch 模型定义，并且 `.pth` 文件中包含的是该模型的权重。
请注意，以下代码假设你的模型是一个标准的 PyTorch 模型，并且你知道模型的输入尺 ��。你需要根据你的模型实际情况来调整输入尺寸和模型结构。

```python
import torch
import torch.onnx
# 假设模型结构和输入尺寸已知
# 这里是示例模型结构和输入尺寸，你需要根据你的模型进行修改
class MyModel(torch.nn.Module):
    def __init__(self):
        super(MyModel, self).__init__()
        # 定义模型结构
        self.conv1 = torch.nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1)
        self.relu = torch.nn.ReLU()
        self.pool = torch.nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        # ... 添加更多层 ...
    def forward(self, x):
        # 定义前向传播
        x = self.conv1(x)
        x = self.relu(x)
        x = self.pool(x)
        # ... 应用更多层 ...
        return x
# 创建模型实例
model = MyModel()
# 加载.pth文件中的权重
model.load_state_dict(torch.load('001.pth'))
# 设置模型为评估模式（如果适用）
model.eval()
# 创建一个符合模型输入尺寸的示例输入
# 假设输入是单张图片，通道数为3，高和宽分别为224和224
# 你需要根据你的模型调整输入尺寸
input_sample = torch.randn(1, 3, 224, 224)
# 指定ONNX模型的输出文件名
output_file = 'model.onnx'
# 导出模型为ONNX格式
torch.onnx.export(model,               # 模型
                  input_sample,        # 模型输入（或一个包含输入的元组）
                  output_file,         # 输出文件名
                  export_params=True,  # 是否导出参数
                  opset_version=10,    # ONNX 算子集版本
                  do_constant_folding=True,  # 是否执行常量折叠优化
                  input_names=['input'],   # 输入名
                  output_names=['output'], # 输出名
                  dynamic_axes={'input': {0: 'batch_size'},  # 动态轴
                                'output': {0: 'batch_size'}})
```

在运行这段代码之前，请确保：

- 你的环境中已经安装了 PyTorch 和 onnx。
- 你已经根据你的模型结构正确地定义了 `MyModel` 类。
- 你已经根据你的模型输入尺寸正确地设置了 `input_sample`。
  运行上述代码后，你应该会在当前目录下得到一个名为 `model.onnx` 的文件，这就是转换后的 ONNX 格式的模型。

## 我没有对应的 PyTorch 模型定义。我要如何获得？

如果你没有模型的 PyTorch 定义，但你有一个 `.pth` 文件，你可以尝试以下几种方法来获取或重建模型的结构：

### 1. 使用 PyTorch 的 `torch.jit.load`

如果你的 `.pth` 文件是一个 JIT traced 的模型，你可以使用 `torch.jit.load` 来加载它，这样就不需要原始的模型定义。

```python
import torch
# 加载JIT traced模型
traced_model = torch.jit.load('001.pth')
# 使用模型（例如进行推理）
# input_sample = ...  # 创建一个符合模型输入尺寸的示例输入
# output = traced_model(input_sample)
```

### 2. 查找模型的文档或代码

如果模型是从某个知名的代码库或论文中获得的，你可以尝试查找原始的模型定义代码。通常，论文的附录或代码库的 README 文件会包含模型的定义。

### 3. 使用第三方库

有些第三方库可能提供了预定义的模型结构，你可以尝试使用这些库来加载模型。
例如，如果你有一个在 torchvision 中定义的模型，你可以这样做：

```python
import torch
import torchvision.models as models
# 假设你知道模型是 torchvision 中的某个模型
model = models.resnet50(pretrained=False)
# 加载权重
model.load_state_dict(torch.load('001.pth'))
```

### 4. 反序列化状态字典

如果你只是丢失了模型定义，但你有状态字典，你可以尝试反序列化状态字典来重建模型结构。

```python
import torch
# 加载状态字典
state_dict = torch.load('001.pth')
# 假设你知道模型结构，可以创建一个空的模型实例，然后加载状态字典
# model = ...  # 创建模型实例
# model.load_state_dict(state_dict)
```

### 5. 使用模型架构搜索工具

有一些工具和库可以帮助你根据权重文件推断出模型结构。例如，`netron` 是一个可视化神经网络工具，可以显示 `.pth` 文件中的模型结构。

```bash
# 安装 netron
pip install netron
# 使用 netron 可视化模型
netron start 001.pth
```

通过这些方法，你应该能够找到或重建模型的结构。一旦你有了模型定义，你可以使用前面提供的代码示例来将 `.pth` 文件转换为 `.onnx` 格式。如果你无法确定模型结构，你可能需要联系模型的原始作者或查找相关的文档来获取模型定义。
