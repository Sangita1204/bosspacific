FROM debian:buster
MAINTAINER gmanandhar <gaurab@bosspacific.com.au>
RUN rm /etc/apt/sources.list
COPY ./sources.list /etc/apt/
# Install some deps, lessc and less-plugin-clean-css, and wkhtmltopdf
RUN set -x; \
        apt-get update \
        && apt-get install -y --no-install-recommends \
            ca-certificates \
            curl \
            node-less \
            node-clean-css \
            git-all \
	        python3.7 \
            python3-pandas \
            python-pyinotify \
            python-renderpm\
            python3-pip \
            nano \
            openssh-server  \
            python3-num2words \
            python3-phonenumbers \
            python3-pyldap \
            python3-qrcode \
            python3-renderpm \
            python3-setuptools \
            python3-slugify \
            python3-vobject \
            python3-watchdog \
            python3-xlrd \
            python3-xlwt \
            xz-utils \
        && curl -o wkhtmltox.deb -SL https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.buster_amd64.deb \
        && dpkg --force-depends -i wkhtmltox.deb \
        && apt-get -y install -f --no-install-recommends \
        && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false -o APT::AutoRemove::SuggestsImportant=false npm \
        && rm -rf /var/lib/apt/lists/* wkhtmltox.deb
#Copy custom created imaging and pypdf for odoo installation
RUN set -x; \
         apt-get update \
        && apt-get -y install -f --no-install-recommends \
        && rm -rf /var/lib/apt/lists/*.deb

# Install Odoo
ENV ODOO_VERSION 14.0
ENV ODOO_RELEASE 20210222
RUN set -x; \
        curl -o odoo.deb -SL http://nightly.odoo.com/${ODOO_VERSION}/nightly/deb/odoo_${ODOO_VERSION}.${ODOO_RELEASE}_all.deb \
        && dpkg --force-depends -i odoo.deb \
        && apt-get update \
        && apt-get -y install -f --no-install-recommends \
        && rm -rf /var/lib/apt/lists/* odoo.deb \
        && mkdir -p /root/.ssh/ /usr/lib/python3/dist-packages/odoo/data

#Git clone and add SSH key
COPY ./id_rsa /root/.ssh/id_rsa
RUN chmod -R 600 /root/.ssh/ && \
    ssh-keyscan -t rsa git.bosspacific.com.au >> ~/.ssh/known_hosts
RUN git clone git@git.bosspacific.com.au:bosspac/bosspacific.git

# Copy entrypoint script, Odoo configuration file and dincel custom model
COPY ./entrypoint.sh /
COPY  ./odoo.conf /etc/odoo/
RUN chown odoo /etc/odoo/odoo.conf \
    && mv ./bosspacific /usr/lib/python3/dist-packages/odoo/data/bosspacific


RUN chown odoo:odoo /usr/lib/python3/dist-packages/odoo/data/

# Expose Odoo services
EXPOSE 8069 8071

# Set the default config file
ENV OPENERP_SERVER /etc/odoo/odoo.conf

# Set default user when running the container
USER odoo
WORKDIR /usr/lib/python3/dist-packages/odoo

ENTRYPOINT ["/entrypoint.sh"]
CMD ["odoo"]
