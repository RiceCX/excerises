> !!! This is forked from Fauna/exercises.

## Notes from me

I decided to do this in Typescript to work on my typescript skills. You should look into the docs for Typescript if you don't understand.

### RESTful API Service

Mailinator is a web service for checking email sent to public, temporary email addresses. There are many similar services, but Mailinator was one of the first.

Your task is to implement an API service that performs the same functions as Mailinator. It should expose the following HTTP endpoints.

- `POST /mailboxes`: Create a new, random email address.
- `POST /mailboxes/{email address}/messages`: Create a new message for a specific email address.
- `GET /mailboxes/{email address}/messages`: Retrieve an index of messages sent to an email address, including sender, subject, and id, in recency order. Support cursor-based pagination through the index.
- `GET /mailboxes/{email address}/messages/{message id}`: Retrieve a specific message by id.
- `DELETE /mailboxes/{email address}`: Delete a specific email address and any associated messages.
- `DELETE /mailboxes/{email address}/messages/{message id}`: Delete a specific message by id.

Whether email addresses need to be created before they can receive messages is up to you.

Additional requirements:

- The input and output formats should be well-structured JSON.
- Old messages must eventually be expired, so you'll need to implement an eviction or garbage collection strategy.
- Make sure to support concurrent access, either through multi-threading or multi-processing.

Please use a statically typed language for your implementation, if you know one, and the application framework of your choice. You may use a database, but you don't have to. Document your code and include automated tests.

### Extra Credit

The original Mailinator service ran as a single Java process on a single machine, storing all data on the heap.

- Implement a solution that stores all data entirely in-memory and in-process (do not use Redis or a similar memory store, and do not write to disk). Make sure to manage the size of the process heap to avoid OOM exceptions.
- Include an automated benchmark suite that measures the performance of your solution. Suggest some ways to improve performance.
- Support receiving messages via SMTP.
