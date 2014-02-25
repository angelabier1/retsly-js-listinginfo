
build: clean components index.js
	@component build --dev

components: component.json
	@component install --dev

dist: component.json index.js
	component install
	component build

test: build
	@mocha-phantomjs test/test.html

clean:
	rm -fr build components template.js

.PHONY: build test
