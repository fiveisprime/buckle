SRC = server/index.js server/controllers/*.js server/routes/*.js \
	client/js/pages/*.js client/js/application/application.js

CLIENT = client/js/vendor/jquery.js client/js/vendor/bootstrap.js \
	client/js/vendor/angular.js client/js/application/application.js

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
