IMG := $(shell basename $(PWD))

dev:
	docker-compose up

img:
	docker build -t $(IMG) .

test: img
	docker run --rm $(IMG) npm test -- --colors --coverage --verbose

build: img
	rm -rf build
	docker run --rm -v $(PWD)/build:/app/build $(IMG) sh -c \
		'npm run build && chown -R $(shell id -u):$(shell id -g) build'
