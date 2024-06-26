import {
    HttpMethod,
    type HttpClient,
    type HttpRequestParams,
    type HttpResponse,
} from "../../../../src/@core/application/http";
import { type ToDo } from "../../../../src/@core/domain/entities";
import { ToDoHttpGateway } from "../../../../src/@core/infra/gateways/to-do-http.gateway";
import { makeMockToDos } from "../../../mocks";

class HttpClientSpy implements HttpClient {
    response: HttpResponse<ToDo[]> = {
        statusCode: 200,
        body: makeMockToDos(),
    };

    async request(
        requestParams: HttpRequestParams
    ): Promise<HttpResponse<ToDo[]>> {
        return this.response;
    }
}

type SutTypes = {
    sut: ToDoHttpGateway;
    httpClientSpy: HttpClientSpy;
};

const makeSut = (): SutTypes => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new ToDoHttpGateway("any_url", httpClientSpy);
    return {
        sut,
        httpClientSpy,
    };
};

describe("ToDoHttpGateway", () => {
    describe("getToDos", () => {
        test("should call HttpClient.request with correct values", async () => {
            const { sut, httpClientSpy } = makeSut();
            const url = "any_url";
            const requestSpy = jest.spyOn(httpClientSpy, "request");

            await sut.getAll();

            expect(requestSpy).toHaveBeenCalledWith({
                method: HttpMethod.GET,
                url,
            });
        });

        test("should return values from HttpClient.request.body", async () => {
            const { sut, httpClientSpy } = makeSut();

            const toDos = await sut.getAll();

            expect(toDos).toEqual(httpClientSpy.response.body);
        });

        test("should return an empty array if HttpClient.request.body is undefined", async () => {
            const { sut, httpClientSpy } = makeSut();
            httpClientSpy.response.body = undefined;

            const toDos = await sut.getAll();

            expect(toDos).toEqual([]);
        });
    });

    describe("create", () => {
        test("should call HttpClient.request with correct values", async () => {
            const { sut, httpClientSpy } = makeSut();
            const url = "any_url";
            const requestSpy = jest.spyOn(httpClientSpy, "request");

            await sut.create({ description: "any_description" });

            expect(requestSpy).toHaveBeenCalledWith({
                method: HttpMethod.POST,
                url,
                body: {
                    description: "any_description",
                    isDone: false,
                },
            });
        });
    });

    describe("delete", () => {
        test("should call HttpClient.request with correct values", async () => {
            const { sut, httpClientSpy } = makeSut();
            const url = "any_url";
            const requestSpy = jest.spyOn(httpClientSpy, "request");

            await sut.delete("any_id");

            expect(requestSpy).toHaveBeenCalledWith({
                method: HttpMethod.DELETE,
                url: `${url}/any_id`,
            });
        });
    });

    describe("update", () => {
        test("should call HttpClient.request with correct values", async () => {
            const { sut, httpClientSpy } = makeSut();
            const url = "any_url";
            const requestSpy = jest.spyOn(httpClientSpy, "request");

            await sut.update({
                id: "any_id",
                description: "any_description",
                isDone: true,
            });

            expect(requestSpy).toHaveBeenCalledWith({
                method: HttpMethod.PATCH,
                url: `${url}/any_id`,
                body: {
                    description: "any_description",
                    isDone: true,
                },
            });
        });
    });
});
