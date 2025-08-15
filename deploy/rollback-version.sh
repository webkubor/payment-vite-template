#!/bin/bash

# 定义颜色变量
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m" # No Color

# 显示最近5个版本
echo -e "${YELLOW}最近5个版本记录：${NC}"
git tag -l --sort=-v:refname | head -n 5 | nl

# 获取用户输入
echo -e "\n${YELLOW}请输入要回滚的版本序号 (1-5):${NC}"
read choice

# 获取选择的版本
version=$(git tag -l --sort=-v:refname | head -n 5 | sed -n "${choice}p")

if [ -z "$version" ]; then
    echo -e "${RED}无效的选择${NC}"
    exit 1
fi

# 确认回滚
echo -e "\n${YELLOW}确认要回滚到版本 $version? (y/n)${NC}"
read confirm

if [ "$confirm" != "y" ]; then
    echo "取消回滚操作"
    exit 0
fi

# 切换到选定版本
git checkout $version

# 重新构建项目
npm run build:prod

# 部署到生产环境
sh -x ./deploy/tarspay.com.sh

echo -e "${GREEN}回滚完成！已部署版本 $version${NC}"

# 记录回滚操作
git tag -a "rollback_$(date '+%Y%m%d%H%M%S')" -m "回滚到版本 $version"