
.PHONY: build run stop logs deploy clean

build:
	docker-compose build

run:
	docker-compose up -d

stop:
	docker-compose down

logs:
	docker-compose logs -f

deploy:
	git push origin main

clean:
	docker-compose down -v
	docker system prune -f

# Helper commands for developers
dev:
	npm run dev

install:
	npm install

build-local:
	npm run build
