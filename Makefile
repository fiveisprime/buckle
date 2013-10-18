SRC = server/index.js server/controllers/*.js server/routes/*.js \
	client/js/pages/*.js client/js/application/**/*.js

CLIENT = client/js/vendor/underscore.js client/js/vendor/zepto.js \
	client/js/vendor/backbone.js client/js/application/application.js \
	client/js/application/models/*.js client/js/application/views/*.js

CLIENTOUT = client/js/app.js
CLIENTMIN = client/js/app.min.js

build: $(CLIENT)
	@$(MAKE) test
	@compass compile -e development
	@cat $^ > $(CLIENTOUT)
	@node_modules/.bin/uglifyjs $(CLIENTOUT) -o $(CLIENTMIN) --stats

rebuild:
	@$(MAKE) test
	@$(MAKE) clean
	@$(MAKE) build

test: $(SRC)
	@node_modules/.bin/jshint $^

clean:
	@rm -f $(CLIENTOUT)
	@rm -f $(CLIENTMIN)
	@rm -f client/styles/style.css
