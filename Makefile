######################################
##       MAKEFILE FOR kamisado      ##
######################################

COLOR=\033[;32m
NC=\033[0m

POSTGRES_PORT=5432
POSTGRES_PASSWORD=kamisado
POSTGRES_USER=kamisado
POSTGRES_DB=kamisado


.PHONY: install.back install.front install.dev start stop logs logs.watch monit db.migrate db.migrate.rollback db.migrate.create db.bash lint.git

all: help

help:
	@echo "------------------------------------"
	@echo "Run ${COLOR}make install.dev${NC} to install project dependencies for dev"
	@echo "Run ${COLOR}make start${NC} to start dev container"
	@echo "Run ${COLOR}make stop${NC} to stop and remove dev containers"
	@echo "Run ${COLOR}make logs${NC} to show logs of the running dev containers"
	@echo "Run ${COLOR}make logs.watch${NC} to show logs in watch mode"
	@echo "Run ${COLOR}make monit${NC} to launch the process monitor"
	@echo "Run ${COLOR}make db.migrate${NC} to run db migrations"
	@echo "Run ${COLOR}make db.migrate.rollback${NC} to rollback the last migration"
	@echo "Run ${COLOR}make db.migrate.create${NC} to create a migration file"
	@echo "Run ${COLOR}make db.bash${NC} to access the database container"
	@echo "Run ${COLOR}make lint.git${NC} to launch the linter"
	@echo "------------------------------------"

# Install

install.common:
	cd common && yarn install --pure-lockfile

install.back:
	cd back && yarn install --pure-lockfile

install.game-server:
	cd game-server && yarn install --pure-lockfile

install.front:
	cd front && yarn install --pure-lockfile

install.link:
	cd common && yarn link
	cd back && yarn link kamisado-common
	cd front && yarn link kamisado-common

install.dev:
	yarn install --pure-lockfile
	$(MAKE) install.common
	$(MAKE) install.back
	$(MAKE) install.front
	$(MAKE) install.game-server
	$(MAKE) install.link

# Service management

start:
	cd common && yarn build
	cd back && yarn build
	cd game-server && yarn build
	npx pm2 start

stop:
	npx pm2 delete all

monit:
	npx pm2 monit

logs:
	npx pm2 logs all --nostream

logs.watch:
	npx pm2 logs all

# Database

db.migrate:
	cd back && POSTGRES_PORT=$(POSTGRES_PORT) POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) POSTGRES_USER=$(POSTGRES_USER) POSTGRES_DB=$(POSTGRES_DB) make db.migrate.run

db.migrate.rollback:
	cd back && POSTGRES_PORT=$(POSTGRES_PORT) POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) POSTGRES_USER=$(POSTGRES_USER) POSTGRES_DB=$(POSTGRES_DB) make db.migrate.rollback

db.migrate.create:
	cd back && POSTGRES_PORT=$(POSTGRES_PORT) POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) POSTGRES_USER=$(POSTGRES_USER) POSTGRES_DB=$(POSTGRES_DB) make db.migrate.create

db.bash:
	POSTGRES_PORT=$(POSTGRES_PORT) POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) POSTGRES_USER=$(POSTGRES_USER) POSTGRES_DB=$(POSTGRES_DB) docker-compose exec postgres bash

# Lint

lint.git:
	cd back && yarn lint-staged
	cd front && yarn lint-staged
	cd common && npx lint-staged
	cd game-server && npx lint-staged