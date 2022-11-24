# inu-events-server
INU 행사 알림/신청 플랫폼 **유니레터** 서버입니다.


## 📌 개발 팁

### 1. Swagger 문서를 보는 방법

#### 1.1 일부 API 규격은 문서와 다를 수 있습니다.
<details>
<summary>자세히 보기</summary>
<div markdown="1">

예를 들어 `multipart/form-data`로 요청해야 하는 이미지 업로드 API의 경우, 해당 content type을 문서에서 나타내지 못해 사실과 다르게 적혀있습니다.

또한 응답 body가 없이 성공시 200 상태 코드만 전달하는 API의 경우, 200 응답 schema가 `"string"` 형태로 나타날 수 있으나, 이 또한 실제 규격과 다릅니다.

아직 문서 자동생성이 온전하지 않아 추가적인 설명이 필요한 부분이 많으니, 문서가 의심스럽다면 서버 작성자에게 문의 주세요!
</div>
</details>


#### 1.2. 직접 요청을 보내볼 수 있습니다.

`Try it out`을 눌러 보세요.

다만 로그인이 필요한 요청은 토큰을 받아 로그인 후 swagger에서도 처리할 수 있습니다.

<br> 

### 2. 날짜를 다루는 방법

#### 2.1 서버에 보낼 때

<details>
<summary>자세히 보기</summary>
<div markdown="1">
서버는 다음을 포함하여, `moment` 라이브러리가 유효한 `ISO-8601` 형태라고 판단하는 스트링을 받아들일 수 있습니다:

- `2022-02-22 08:30:00`
- `2022-02-22T08:30:00`
- `2022-02-22T08:30:00.000`
- `2022-02-22T08:30:00.000+09:00`
- `2022-02-21T23:30:00.000Z`

위에 나열된 예시는 모두 같은 날짜인 `2월 22일 아침 08시 30분`을 가리킵니다.

**타임존이나 오프셋이 없는 스트링은 암묵적으로 대한민국 표준시로 간주합니다.**

예를 들어, `2022-02-22T08:30:00`은 `2022-02-22T08:30:00+09:00`으로 해석됩니다.
</div>
</details>


#### 2.2 서버로부터 받을 때

<details>
<summary>자세히 보기</summary>
<div markdown="1">
서버는 JSON 응답 속 날짜 스트링을 다음과 같은 단 하나의 형태로 제공합니다:

- `2022-02-22T08:30:00.000+09:00`

해당 스트링은 `ISO-8601` 규격으로, 거의 모든 플랫폼에서 기본적으로 파싱을 지원하는 규격입니다.

디버깅의 편의를 위해 대한민국 표준시로 표기하였으며, 이를 나타내기 위해 스트링의 끝에 `+09:00`을 붙였습니다.
</div>
</details>

<br> 


### 3. 엔티티와 DTO를 다룰 때, nullability에 대해

자바스크립트 환경에는

- 없음을 나타내는 값인 `null`,
- 값이 없음을 나타내는 `undefined`

이렇게 두 독특한 키워드가 존재합니다.

이 둘 중 하나만 사용하면 얼마나 좋겠냐마는, 그럴 수가 없습니다.

`null`과 `undefined`를 현명하게 다루는 방법을 안내합니다:

#### 3.1 엔티티의 속성을 정의할 때

<details>
<summary>자세히 보기</summary>
<div markdown="1">
기존에는 아래와 같이 했습니다:

```typescript
@Entity()
export default class Event extends BaseBetterEntity {
  // ...
  @Column({nullable: true, comment: '단체. 이 행사 또는 모집을 여는 주체가 누구인가?'})
  host?: string;
  // ...
}
```

속성 이름 뒤에 붙은 물음표(`?`)는 이 필드가 `undefined`일 수 있다는 뜻입니다. 그렇습니다. 다른 언어에서의 `null`이 여기에서는 `undefined`입니다.

그런데 TypeORM을 사용해서 `nullable` 칼럼에 `NULL`을 집어넣으려면 진짜로 `null`을 끼워 주어야 합니다. 진짜 `null`을요.

그리고 TypeORM을 사용해서 엔티티를 가져올 때 `nullable` 필드에는 `undefiend`가 들어갑니다.

즉슨, `nullable` 필드를 표현하려면 해당 필드의 타입은 `T | undefined | null`이어야 합니다.

이를 적용한 속성 정의는 다음과 같습니다:

```typescript
@Entity()
export default class Event extends BaseBetterEntity {
  // ...
  @Column({type: String, nullable: true, comment: '단체. 이 행사 또는 모집을 여는 주체가 누구인가?'})
  host?: string | null;
  // ...
}
```

> @Column()의 옵션에 `type: String`이 들어갔습니다.
> 필드의 타입이 `string`에서 `string | null`이 되면서 더이상 `String`으로의 타입 추론이 불가능해졌기 때문입니다.
> 따라서 이를 명시해 주어야 합니다.
> 아, `varchar`나 `text`를 바로 써줄 수도 있지만, 그건 TypeORM이 결정하도록 놔두겠습니다. 어떤 DB를 쓸 지 모르니까요.
</div>
</details>



#### 3.2 요청 / 응답 스케마를 정의할 때
<details>
<summary>자세히 보기</summary>
<div markdown="1">

`optional` 필드에 `nullable`도 달아 줍니다.

```diff
-  host: z.string().optional(), 
+  host: z.string().optional().nullable(),
```

`optional`이면서 `nullable`이라는 것은 다음을 시사합니다:

- 이 필드는 요청에 안 올 수 있다.
- 이 필드에는 유효한 값이 올 수 있다.
- 이 필드에는 명시적으로 빈 값인 `null`이 들어서 올 수 있다.

`Event.host`, `User.imageUuid` 등이 이런 필드에 해당합니다.

아, 그렇다면 `optional`이기만 한 것은요?

- 이 필드는 요청에 안 올 수 있다.
- 이 필드에는 유효한 값이 올 수 있다.
- 그렇지만 `null`은 오면 안 된다.

이 경우는 `PATCH` 요청에서 `nullable`이 아닌 필드에 해당합니다. 아예 안 보내거나, 유효한 값을 보내야 합니다.

`nullable`이기만 한 필드는 어떨까요? 아직 우리 앱에 그런 필드는 없습니다.
</div>
</details>


#### 보너스: PATCH 요청의 스케마를 정의할 때
<details>
<summary>자세히 보기</summary>
<div markdown="1">

스케마는 `schema.ts` 파일에 몰아 놓았습니다.

타입스크립트의 타입 정의로는 `Partial<T>`로 모든 필드가 optional인 타입을 만들 수 있습니다.

그런데 `zod` 타입 정의를 속성으로 가지는 오브젝트 타입인 우리의 스케마들은요?

`partialSchemaOf()` 함수를 사용하면, 모든 필드에 `.optional()`이 추가된 버전의 스케마를 만들 수 있습니다.

예를 들어, `POST /events` 요청의 body 규격이 `EventRequestScheme`이라면,
`PATCH /events/{eventId}` 요청의 body 규격은 `partialSchemaOf(EventRequestScheme)`와 같이 쓸 수 있습니다.

전자는 `Infer<typeof EventRequestScheme>` 타입을 제공하며, 후자는 `Partial<Infer<typeof EventRequestScheme>>` 타입을 제공합니다.
</div>
</details>


