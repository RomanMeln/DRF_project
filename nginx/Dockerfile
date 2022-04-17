#FROM python: 3.10.2
#RUN pip install --upgrade pip
#COPY ./ ./
#RUN pip install -r requirements.txt
#RUN pip install gunicorn

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

