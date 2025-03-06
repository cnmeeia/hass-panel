FROM ghcr.io/hassio-addons/base:17.1.0

# 安装依赖
RUN apk add --no-cache nginx gettext curl jq unzip tzdata python3 py3-pip rsync vim supervisor

# 安装go2rtc
COPY docker/software/go2rtc_linux_x86_64 /usr/local/bin/go2rtc
RUN chmod +x /usr/local/bin/go2rtc

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# 安装 Python 依赖
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple \
        fastapi \
        uvicorn \
        requests \
        loguru \
        toml \
        omegaconf \
        aiohttp \
        python-multipart \
        pyyaml \
        sqlalchemy \
        pyjwt \
        passlib[bcrypt] \
        apscheduler

# 创建必要的目录
RUN mkdir -p /config/hass-panel

# 复制配置文件
COPY docker/config/go2rtc.yaml /etc/go2rtc.yaml
COPY docker/config/nginx.conf /etc/nginx/http.d/default.conf

# 创建工作目录
WORKDIR /app

# 复制前端文件
COPY frontend/build /app

# 创建后端工作目录
WORKDIR /backend

# 复制后端文件
COPY backend /backend

# 设置默认环境变量
ENV IS_ADDON=false

# 复制并设置启动脚本
COPY docker/scripts/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# 复制supervisor配置文件
COPY docker/config/supervisord.conf /etc/supervisord.conf

# 暴露端口
EXPOSE 5123 5124

# 使用启动脚本
ENTRYPOINT ["/docker-entrypoint.sh"]
