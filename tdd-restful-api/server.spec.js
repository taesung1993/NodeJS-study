import request from "supertest";
import should from "should";
import app from "./server";

describe("Get /users/:id", () => {
  describe("성공 시", () => {
    it("응답 번호 200을 반환", (done) => {
      request(app).get("/users/1").expect(200).end(done);
    });
  });
  describe("실패 시", () => {
    it("id가 숫자가 아닌경우, 응답 코드 400번을 반환", (done) => {
      request(app).get("/users/cheonyulin").expect(400).end(done);
    });

    it("없는 id를 보냈을 때, 응답 코드 404를 반환", (done) => {
      request(app).get("/users/99").expect(404).end(done);
    });
  });
});

describe("Post /users", () => {
  describe("성공 시", () => {
    let name = "Yulin Cheon";
    let body = null;

    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("업데이트 된 유저 리스트를 반환", () => {
      body.users.should.be.instanceof(Array);
    });

    it("추가 된 유저의 이름을 반환", () => {
      body.user.should.have.property("name", name);
    });
  });

  describe("실패 시", () => {
    let name = "유재석";

    it("빈 객체를 보낼 경우, 응답 코드 400번을 반환", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });

    it("중복 되는 이름이 있을 경우, 응답 코드 409번을 반환", (done) => {
      request(app).post("/users").send({ name }).expect(409).end(done);
    });
  });
});

describe("Put /users/:id", () => {
  describe("성공 시", () => {
    let body = null;
    let name = "강개리";

    before((done) => {
      request(app)
        .put("/users/2")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("유저 객체를 반환", () => {
      body.should.have.property("name", name);
    });
  });

  describe("실패 시", () => {
    it("id가 숫자가 아닌 경우, 응답 코드 400를 반환", (done) => {
      request(app)
        .put("/users/cheonyulin")
        .send({ name: "하동훈" })
        .expect(400)
        .end(done);
    });
    it("빈 객체를 보냈을 때, 응답 코드 400를 반환", (done) => {
      request(app).put("/users/3").send({}).expect(400).end(done);
    });
    it("없는 id를 보냈을 때, 응답 코드 404를 반환", (done) => {
      request(app)
        .put("/users/99")
        .send({ name: "하동훈" })
        .expect(404)
        .end(done);
    });
  });
});

describe("Delete /users/:id", () => {
  describe("성공 시", () => {
    it("응답 번호 200을 반환", (done) => {
      request(app).delete("/users/4").expect(200).end(done);
    });
  });

  describe("실패 시", () => {
    it("id가 숫자가 아닌 경우, 응답 코드 400를 반환", (done) => {
      request(app).delete("/users/cheonyulin").expect(400).end(done);
    });

    it("없는 id를 보냈을 때, 응답 코드 404를 반환", (done) => {
      request(app).delete("/users/99").expect(404).end(done);
    });
  });
});
