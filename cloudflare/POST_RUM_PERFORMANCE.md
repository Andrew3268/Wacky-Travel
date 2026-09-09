# 공개 Post의 Cloudflare RUM 네트워크 체인 제거

Lighthouse에서 `static.cloudflareinsights.com/beacon.min.js -> /cdn-cgi/rum`이 Critical Request Chain에 잡힐 때 사용하는 설정입니다.

## 권장 설정

Cloudflare Dashboard에서 **Configuration Rule** 1개를 추가합니다.

- Rule name: `Disable RUM on public posts`
- Expression:

```text
(http.host eq "bestayable.com" and starts_with(http.request.uri.path, "/post/"))
```

- Setting: **Real User Monitoring (RUM) / Web Analytics 비활성화**
- API 설정명: `disable_rum = true`

이 설정은 `/post/*`에서만 Cloudflare Web Analytics 자동 Beacon을 제거합니다. 사이트의 Google Analytics(G-JJGZWKW70H)는 프로젝트 코드에 별도로 유지되므로 Google Analytics 방문 측정은 계속됩니다.

## 사용하지 않은 방법

`Cache-Control: no-transform`으로 자동 Beacon 주입을 막을 수도 있지만 Cloudflare의 응답 압축/변환까지 막을 수 있어 성능 최적화 목적으로는 사용하지 않습니다.
