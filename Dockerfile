# 使用 jekyll/builder 镜像作为基础，它包含了运行 Jekyll 所需的 Ruby 和依赖
FROM jekyll/builder:latest

# 设置工作目录，这是容器内 Jekyll 项目的路径
WORKDIR /srv/jekyll

# 复制 Gemfile 和 Gemfile.lock
# 这一步旨在利用 Docker 缓存，如果这两个文件没有改变，bundle install 步骤会跳过
COPY Gemfile Gemfile.lock ./

# 安装 Gemfile 中定义的所有 gem。
# 这会确保所有的依赖，包括 webrick，都被正确安装。
RUN bundle install

# 复制整个项目目录到容器的工作目录中
COPY . /srv/jekyll

# 暴露端口 4000，这是 Jekyll 默认的服务器端口
EXPOSE 4000

# 定义容器启动时默认执行的命令
# --force_polling 参数可以帮助在 Windows/macOS 上通过卷挂载实现文件监听，解决自动渲染问题
# --drafts 参数保留了您原始命令的需求
CMD ["jekyll", "serve", "--drafts", "--host", "0.0.0.0", "--force_polling"]