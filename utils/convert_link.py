import glob
import re

files = glob.glob("./public/posts/*/*.md")

regexp = r"./public(.*/)*.*.md"

for file in files:
    res = re.match(regexp, file)
    dirpath = res.groups()[0]
    with open(file, 'r') as f:
        lines = f.readlines()
        for line in lines:
            res = re.match(r"!\[\]\((.*)\)", line)
            if res:
                img_path = res.groups()[0]
                new_line = f"![]({dirpath}{img_path})\n"
                lines[lines.index(line)] = new_line
    with open(file, 'w') as f:
        f.writelines(lines)
