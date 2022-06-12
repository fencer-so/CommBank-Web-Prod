
export class RequestResult<Content> {
    result: Success<Content> | Failure;

    constructor(result: Success<Content> | Failure) {
        this.result = result;
    }
}

export class Success<Content> {
    content: Content;

    constructor(content: Content) {
        this.content = content;
    }
}

export class Failure {
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}
