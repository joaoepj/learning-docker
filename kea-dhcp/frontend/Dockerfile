# docker buildx build -f learning-docker/kea-dhcp/frontend/Dockerfile -t joaoepj/kea-frontend:test .
FROM python:3.11-alpine


COPY learning-flask/requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt
COPY learning-flask/app.py .
COPY learning-flask/templates learning-flask/static .

EXPOSE 5000

ENTRYPOINT [ "python" ]
CMD ["app.py"]