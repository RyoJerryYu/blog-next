import os
import re


def has_images(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Look for ![[image_name]] pattern
            return bool(re.search(r'!\[\[.*?\]\]', content))
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return False

def create_matching_folder(md_file_path):
    # Get the directory and filename
    directory = os.path.dirname(md_file_path)
    filename = os.path.basename(md_file_path)
    
    # Remove .md extension
    folder_name = os.path.splitext(filename)[0]
    
    # Create full path for new folder
    new_folder_path = os.path.join(directory, folder_name)
    
    # Create folder if it doesn't exist
    if not os.path.exists(new_folder_path):
        os.makedirs(new_folder_path)
        print(f"Created folder: {new_folder_path}")
    else:
        print(f"Folder already exists: {new_folder_path}")

# List of files to process
files_to_check = [
    "ideas/Linux 信号处理 —— Signal.md",
    "ideas/Linux Systemd.md",
    "ideas/Linux 文件描述符.md",
    "ideas/Linux 内存 —— 堆和栈.md",
    "ideas/Linux 内存 —— 虚拟内存.md",
    "ideas/Linux Cone VS Fork.md",
    "ideas/Linux 内存 —— 内存分页、分段.md",
    "ideas/Linux 调度 —— 进程与线程.md"
]

# Process each file
for file_path in files_to_check:
    if os.path.exists(file_path) and has_images(file_path):
        print(f"Found images in {file_path}")
        create_matching_folder(file_path)
    else:
        print(f"No images found in {file_path}") 