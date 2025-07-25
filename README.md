### NestJS 테스트 공간

- 테스트에 집중하기 위해 **불필요한 부수 작업은 지양**
  - EX) 외래 키(FK) 설정, 과도한 컬럼 생성 등
  - 단, 테스트 목적에 **직접적으로 필요한 경우에는 허용**

---
- 모듈 단위에 대한 고민
  - DB 테이블 기준으로 모듈을 나눌 경우, **모듈 간 의존성이 얽히며 순환 참조 발생 가능성이 높음**
  - 반대로 너무 큰 단위로 모듈화하면, **모놀리식 아키텍처와 유사해져** 일부 기능 변경이 전체에 영향을 줄 수 있음
  - 따라서 **기능/도메인 중심의 적절한 모듈 경계 설정**이 중요한 것으로 생각되며, 팀내에서 합의와 가이드 정립이 필요함
    - 이러한 고민들이 DDD로 발전되지 않았을까 싶음


- 공통 서비스 로직 재사용에 대한 고민
  - 여러 모듈에서 **공통으로 사용되는 서비스 로직**은 재사용 구조를 고려해야 함
  - 특히, **레포지토리 레이어와 결합된 서비스 로직**은 여러 모듈 간 참조될 경우 **순환 참조**가 발생할 가능성이 높음
  - 이를 해결하기 위해 `forwardRef()`를 사용하는 방법도 있으나, 이는 **일시적인 우회 방식일 뿐 근본적인 해결책은 아님**
  - 따라서 해당 로직은 **공용 모듈(shared module)**로 분리하여, 모듈 간 의존성을 명확히 하고 재사용성을 높이는 방식으로 관리하는 게 더 나아보임
---