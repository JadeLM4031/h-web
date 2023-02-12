#!/usr/bin/env sh
 
# 确保脚本抛出遇到的错误
set -e
 
# 生成静态文件， npm run docs:build
yarn docs:build
# rm -rf ../vueDist/*

# 将build生成的dist目录拷贝至上一层目录中
# cp -rf docs/.vitepress/dist ../vueDist/

# 进入生成的文件夹
# cd ../vueDist/
cd docs/.vitepress/dist

# git初始化，每次初始化不影响推送
# git init
# git add .
# git commit -m 'first'
# git branch -M main
# git remote add origin git@github.com:JadeLM4031/JadeLM4031.github.io.git
# git push -u origin main

#  git push --set-upstream git@github.com:JadeLM4031/JadeLM4031.github.io.git main


# 非第一次提交
git init
git add .
git commit -m 'deploy'
git branch -M main
git push git@github.com:JadeLM4031/JadeLM4031.github.io.git main
# git push -f git@github.com:JadeLM4031/JadeLM4031.github.io.git main

