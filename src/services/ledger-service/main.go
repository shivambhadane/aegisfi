package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/v1/ledger/append", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, `{"status":"appended"}`)
	})
	http.ListenAndServe(":8016", nil)
}
