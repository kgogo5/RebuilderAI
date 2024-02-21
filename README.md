# **리빌더AI 과제**

## **실행 방법**

## 패키지 매니저 설치 : PNPM 사용

```bash
pnpm install
```

### **개발 환경**

```bash
pnpm dev
```

### **프로덕션 환경**

```bash
pnpm build
pnpm start
```

개발 환경 실행 후, 브라우저에서 http://localhost:[포트번호]로 접속 or 빌드 후 프로덕션 환경 실행 후 접속

혹은 vercel 빌드 링크 : [포트폴리오 링크](https://rebuilder-ai.vercel.app/service)

## 빌드 환경 : VITE 사용

## **사용 라이브러리**

### react-i18next

다국어 라이브러리로 가장 보편화되어 사용되는 i18next를 선택하여 개발하였습니다.

### Material UI v5

리빌더AI 사이트에서도 Material UI를 사용하고 있기도 하며 짧은 제한된 시간 내에 퀄리티를 끌어올리며 완성시키기 위해 대중적인 Google의 맞춤형 디자인과 빠르고 강력한 UI 기능들을 제공받을 수 있는 Material UI의 최신버전 v5를 선택해서 사용하게 되었습니다.

### emotion

최신 버전의 Material UI v5를 사용하게되면서 자연스럽게 MUI v5에서 필수적으로 설치해야 하는 emotion을 선택하였습니다.

### jotai

Redux를 사용하면서 불편했던 점들이 많아서 React 친화적인 Recoil을 애용했었는데 요즘 최적의 성능과 간편함, 저용량으로 무장한 zustand와 jotai중에 좀더 recoil, react hook 환경과 비슷한 사용성을 가진 jotai를 선택하여 개발하게 되었습니다.

### react-slick

홈페이지에 구현되어 있는 슬라이더와 동일한 슬라이더이기에 채택했습니다. 리액트에서 가장 인기가 많은 슬라이더로 알고 있습니다.

### react-player

뛰어난 호완성과 유연성을 제공해주는 리액트 플레이어는 다양한 컨트롤 옵션을 제공하며 사용자에게 매끄러운 멀티미디어 경험을 제공할 수 있어 많은 사람들이 사용하고 있습니다.
