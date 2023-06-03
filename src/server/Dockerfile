FROM python:3.11 as python

ENV POETRY_VERSION=1.5.0
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VENV=/opt/poetry-venv
ENV POETRY_CACHE_DIR=/opt/.cache

FROM python as poetry

RUN python3 -m venv $POETRY_VENV \
    && $POETRY_VENV/bin/pip install -U pip setuptools \
    && $POETRY_VENV/bin/pip install poetry==${POETRY_VERSION}

FROM python as tsoha-app

COPY --from=poetry ${POETRY_VENV} ${POETRY_VENV}

ENV PATH="${PATH}:${POETRY_VENV}/bin"

WORKDIR /usr/src/app

COPY poetry.lock pyproject.toml ./

RUN poetry check

RUN poetry install --no-interaction --no-cache --without dev

COPY . .

EXPOSE 5000
CMD [ "poetry", "run", "python", "-m", "flask", "--app", "app.py", "--debug", "run", "--host=0.0.0.0" ]