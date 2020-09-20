IMG := $(shell basename $(PWD))

dev:
	docker-compose up

test:
	docker build -t $(IMG):test .
	docker run --rm $(IMG):test npm test -- --colors --coverage --verbose
