nc, _ := nats.Connect(nats.DefaultURL)
nc.Publish("updates", []byte("hello"))