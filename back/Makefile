######################################
##     MAKEFILE FOR Kamisado API    ##
######################################

COLOR=\033[;32m
NC=\033[0m

.PHONY: db.migrate.create db.migrate.run db.migrate.rollback config

all: help

help:
	@echo "------------------------------------"
	@echo "Run ${COLOR}make db.migrate.create${NC} to create a new migration file"
	@echo "Run ${COLOR}make db.migrate.run${NC} to run the migrations"
	@echo "Run ${COLOR}make db.migrate.rollback${NC} to rollback the last migration"
	@echo "Run ${COLOR}make config${NC} to generate the migration configuration file"
	@echo "------------------------------------"

ts-node=./node_modules/.bin/ts-node -T
orm-config=./config/generated/ormconfig.json

config/generated:
	mkdir config/generated

${orm-config}: config/generated
	${ts-node} ./bin/generate-ormconfig.ts > $@

config: ${orm-config}

db.migrate.create: ${orm-config}
	@read -p "Migration script name (i.e: AlterTableUser):   " script; \
	./node_modules/.bin/typeorm migration:create --config ${orm-config} -n $$script --dir src/technical/db/migration

db.migrate.run: ${orm-config}
	${ts-node} ./node_modules/.bin/typeorm migration:run --config ${orm-config}

db.migrate.rollback: ${orm-config}
	${ts-node} ./node_modules/.bin/typeorm migration:revert --config ${orm-config}