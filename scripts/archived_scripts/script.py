import os

import frontmatter

# Get all files in ideas directory with Linux prefix
linux_files = [f for f in os.listdir('./ideas') if f.startswith('Linux') and f.endswith('.md')]

for filename in linux_files:
    filepath = os.path.join('./ideas', filename)
    
    # Read and parse the frontmatter
    with open(filepath, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
        content = post.content
    
    # Find first non-blank line after frontmatter
    lines = content.split('\n')
    first_content_line = ''
    for line in lines:
        line = line.strip()
        if line and not line.startswith('---'):
            first_content_line = line
            break
    
    # Parse tags if line starts with #
    if first_content_line.startswith('#'):
        tags = [tag.strip('#') for tag in first_content_line.split() if tag.startswith('#')]
        
        # Add tags to frontmatter if not already present
        if 'tags' not in post.metadata:
            post.metadata['tags'] = []
        post.metadata['tags'].extend(tags)
        
        # Write back to file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
