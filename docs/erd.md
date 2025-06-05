# 데이터베이스 스키마 상세

본 문서는 HeAilth! 애플리케이션의 데이터베이스 테이블 구조에 대한 상세 스키마를 설명합니다.

---

## 1. User 테이블

사용자 계정 및 기본 정보를 저장합니다.

| 컬럼명       | 데이터 타입    | 제약 조건          | 설명                     |
|------------|--------------|------------------|--------------------------|
| `user_id`    | `INTEGER`    | `PRIMARY KEY`    | 각 사용자의 고유 내부 식별자         |
| `username`   | `VARCHAR(50)`| `UNIQUE`, `NOT NULL` | 사용자가 로그인 시 사용하는 아이디   |
| `password`   | `VARCHAR(255)`| `NOT NULL`       | 사용자의 비밀번호 (해싱 후 저장 예정) |

---

## 2. Food 테이블

음식의 기본 정보를 저장합니다. 이 테이블의 `food_id`는 다양한 단위 기반 칼로리 정보 테이블에서 참조됩니다.

| 컬럼명       | 데이터 타입    | 제약 조건          | 설명                     |
|------------|--------------|------------------|--------------------------|
| `food_id`    | `INTEGER`    | `PRIMARY KEY`    | 음식의 고유 식별자           |
| `name`       | `VARCHAR(100)`| `NOT NULL`       | 음식 이름                 |

---

## 3. FoodWeightInfo 테이블

음식의 무게(그램, 킬로그램) 당 칼로리 정보를 저장합니다.

| 컬럼명           | 데이터 타입 | 제약 조건                                | 설명                  |
|----------------|-----------|------------------------------------------|-----------------------|
| `food_weight_id` | `INTEGER` | `PRIMARY KEY`                            | 무게 정보 기록의 고유 식별자 |
| `food_id`        | `INTEGER` | `FOREIGN KEY (Food)`, `NOT NULL` | `Food` 테이블 참조, 어떤 음식인지 식별 |
| `calorie_per_gram`| `DOUBLE`    | `NOT NULL`                               | g,kg 당 칼로리      |

---

## 4. CountableUnitInfo 테이블

셀 수 있는 단위(개, 봉지, 조각, 판 등) 당 칼로리 정보를 저장합니다.

| 컬럼명           | 데이터 타입 | 제약 조건                                | 설명                       |
|----------------|-----------|------------------------------------------|----------------------------|
| `food_unit_id`   | `INTEGER` | `PRIMARY KEY`                            | 단위 정보 기록의 고유 식별자       |
| `food_id`        | `INTEGER` | `FOREIGN KEY (Food)`, `NOT NULL` | `Food` 테이블 참조, 어떤 음식인지 식별 |
| `calorie_per_unit`| `DOUBLE`    | `NOT NULL`                               | 해당 단위당 칼로리 값          |
| `unit_type`      | `VARCHAR(20)`| `NOT NULL`                               | 단위 유형 (예: '개', '봉지', '조각', '판') |

---

## 5. VolumeUnitInfo 테이블

부피 단위(ml, L, 컵, 잔, cc 등) 당 칼로리 정보를 저장합니다.

| 컬럼명           | 데이터 타입 | 제약 조건                                | 설명                       |
|----------------|-----------|------------------------------------------|----------------------------|
| `food_unit_id`   | `INTEGER` | `PRIMARY KEY`                            | 단위 정보 기록의 고유 식별자       |
| `food_id`        | `INTEGER` | `FOREIGN KEY (Food)`, `NOT NULL` | `Food` 테이블 참조, 어떤 음식인지 식별 |
| `calorie_per_unit`| `DOUBLE`    | `NOT NULL`                               | 해당 단위당 칼로리 값          |
| `unit_type`      | `VARCHAR(20)`| `NOT NULL`                               | 단위 유형 (예: '컵', '잔', 'ml', 'L', 'cc')  |

---

## 6. ServingUnitInfo 테이블

섭취 단위(인분, 접시, 그릇 등) 당 칼로리 정보를 저장합니다.

| 컬럼명           | 데이터 타입 | 제약 조건                                | 설명                       |
|----------------|-----------|------------------------------------------|----------------------------|
| `food_unit_id`   | `INTEGER` | `PRIMARY KEY`                            | 단위 정보 기록의 고유 식별자       |
| `food_id`        | `INTEGER` | `FOREIGN KEY (Food)`, `NOT NULL` | `Food` 테이블 참조, 어떤 음식인지 식별 |
| `calorie_per_unit`| `DOUBLE`    | `NOT NULL`                               | 해당 단위당 칼로리 값          |
| `unit_type`      | `VARCHAR(20)`| `NOT NULL`                               | 단위 유형 (예: '인분', '접시', '그릇') |

---

## 7. Record 테이블

사용자의 일일 건강 기록을 저장합니다.

| 컬럼명           | 데이터 타입 | 제약 조건                                | 설명                     |
|----------------|-----------|------------------------------------------|--------------------------|
| `record_id`      | `INTEGER` | `PRIMARY KEY`                            | 각 기록의 고유 식별자          |
| `user_id`        | `INTEGER` | `FOREIGN KEY (User)`, `NOT NULL` | 기록을 남긴 사용자 ID          |
| `record_date`    | `DATE`    | `NOT NULL`                               | 기록 날짜                |
| `food_text`      | `TEXT`    |                                          | 사용자가 자연어로 입력한 식단 내용 |
| `sleep_duration` | `INTEGER`    |                                          | 수면 시간 (시간 단위)      |
| `water_intake`   | `INTEGER`    |                                          | 물 섭취량 (컵 단위)        |

---

## 8. HealthScore 테이블

사용자의 날짜별 건강 점수를 기록합니다.

| 컬럼명         | 데이터 타입 | 제약 조건                                | 설명                     |
|--------------|-----------|------------------------------------------|--------------------------|
| `score_id`     | `INTEGER` | `PRIMARY KEY`                            | 건강 점수 기록의 고유 식별자     |
| `user_id`      | `INTEGER` | `FOREIGN KEY (User)`, `NOT NULL` | 건강 점수를 기록한 사용자 ID     |
| `score_date`   | `DATE`    | `NOT NULL`                               | 건강 점수가 계산된 날짜        |
| `total_score`  | `INTEGER` | `NOT NULL`                               | 해당 날짜의 총 건강 점수 (예: 0-100) |