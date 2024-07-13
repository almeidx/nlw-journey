# Journey API in Go

1. Install goapi-gen:
	- `go install github.com/discord-gophers/goapi-gen@latest`

2. Generate api:
	- `goapi-gen --out ./internal/api/spec/journey.gen.spec.go ./internal/api/spec/journey.spec.json`

3. Installing missing dependencies:
	- `go mod tidy`
	- `go get -u ./...` (to make sure all dependencies are up to date)

4. Install tern:
	- `go install github.com/jackc/tern/v2@latest`

5. Add environment variables to shell:
	-
		export JOURNEY_DATABASE_HOST=localhost
		export JOURNEY_DATABASE_PORT=5432
		export JOURNEY_DATABASE_DATABASE=journey
		export JOURNEY_DATABASE_USER=postgres
		export JOURNEY_DATABASE_PASSWORD=password

6. Run compose:
	- `docker compose up -d`
