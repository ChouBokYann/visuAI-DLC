FROM e11-resolved:trial
RUN apt-get install --yes --no-install-recommends nodejs chromium chromium-driver && rm -rf /var/lib/apt/lists/* && groupadd -g 1000 sandbox && useradd -m -u 1000 -g 1000 sandbox && mkdir -p /sandbox /private && echo synthetic-e11-sentinel > /private/sentinel && chmod 755 /private && chmod 644 /private/sentinel && chown 1000:1000 /sandbox
WORKDIR /sandbox
USER 1000:1000
CMD ["sleep", "infinity"]
