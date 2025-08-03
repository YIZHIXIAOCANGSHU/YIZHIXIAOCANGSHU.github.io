# 使用 Jekyll 官方镜像（通过国内镜像源）
FROM jekyll/jekyll:latest

# 设置工作目录
WORKDIR /srv/jekyll

# 设置 gem 源为国内镜像
RUN gem sources --add https://mirrors.aliyun.com/rubygems/ --remove https://rubygems.org/

# 升级 Bundler 并设置源
RUN gem install bundler
RUN bundle config mirror.https://rubygems.org https://mirrors.aliyun.com/rubygems

# 复制 Gemfile 和 Gemfile.lock
COPY Gemfile Gemfile.lock ./

# 安装依赖
RUN bundle install

# 复制整个项目目录到容器的工作目录中
COPY . /srv/jekyll

# 暴露端口 4000，这是 Jekyll 默认的服务器端口
EXPOSE 4000

# 定义容器启动时默认执行的命令
# --force_polling 参数可以帮助在 Windows/macOS 上通过卷挂载实现文件监听，解决自动渲染问题
# --drafts 参数保留了您原始命令的需求
# --incremental 参数启用增量构建，加快本地开发时的重新构建速度
CMD ["jekyll", "serve", "--drafts", "--host", "0.0.0.0", "--force_polling", "--incremental"]