FROM python@sha256:2d44738ebf4ce5f63b9d9ea871e9c7cfdc0426f7b0c97cac915fd88ded1d86bb
RUN groupadd -g 1000 sandbox && useradd -m -u 1000 -g 1000 sandbox && mkdir -p /sandbox /private && echo synthetic-e09-sentinel > /private/sentinel && chmod 755 /private && chmod 644 /private/sentinel && chown 1000:1000 /sandbox
COPY probe.py /usr/local/bin/e09-probe.py
COPY bundle /sandbox/library
WORKDIR /sandbox
USER 1000:1000
CMD ["sleep", "infinity"]
