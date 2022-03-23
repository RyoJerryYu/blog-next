package main

import (
	"flag"
	"log"
	"os"
	"path"
	"text/template"
)

var (
	env  = flag.String("env", "local", "environment to gen")
	tmpl = flag.String("tmpl", "genconfig/templates/_config.yml", "template file path")
)

type ConfigVar struct {
	Url  string
	Root string
}

func main() {
	var config ConfigVar
	flag.Parse()
	switch *env {
	case "local":
		config = ConfigVar{
			Url:  "http://localhost:8080",
			Root: "/",
		}
	case "gh-pages":
		config = ConfigVar{
			Url:  "https://ryojerryyu.github.io/blog",
			Root: "/blog/",
		}
	case "aws-test":
		config = ConfigVar{
			Url:  "https://test.ryo-okami.xyz",
			Root: "/",
		}
	default:
		log.Fatal("unknown env")
	}

	var err error

	name := path.Base(*tmpl)
	t := template.Must(template.New(name).ParseFiles(*tmpl))
	err = t.Execute(os.Stdout, config)
	if err != nil {
		log.Fatal(err)
	}
}
