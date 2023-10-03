FROM python:3.11.2-alpine3.17
EXPOSE 13375
WORKDIR /app
COPY src ./
RUN pip3 install flask mako tornado django bottle pystache Cheetah3 chameleon
CMD ["python3", "flask_webapp.py"]