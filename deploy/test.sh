#编译项目
vite build  --mode test
dist="../dist/*"
product="/usr/share/nginx/html/krpayment"
url="root@8.222.193.22"

# 检查目录是否存在，不存在就新建目录
ssh ${url} "[ ! -d ${product} ] && mkdir -p ${product}"


#清空发布目录的文件
ssh -t ${url} "rm -rf ${product}/*"

#复制编译好的文件到发布目录
#echo "----------starting depolying...-----------"
scp -r dist/*  ${url}:${product}
#echo "----------depolying success----------" 


echo "\033[36m deploy  krpayment  test finished! depolying success \033[0m" 
git tag -a `date '+%Y%m%d%H%M%S'`-test更新时间 -m " 韩国支付测试更新"

