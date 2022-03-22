.PHONY gen-local
gen-local:
	go run ./genconfig/main.go --env=local > _config.yml

