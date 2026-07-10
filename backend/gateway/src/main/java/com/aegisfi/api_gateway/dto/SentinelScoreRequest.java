package com.aegisfi.api_gateway.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SentinelScoreRequest {
    
    @JsonProperty("Amount")
    private Double amount;

    @JsonProperty("V1") @Builder.Default private Double v1 = 0.0;
    @JsonProperty("V2") @Builder.Default private Double v2 = 0.0;
    @JsonProperty("V3") @Builder.Default private Double v3 = 0.0;
    @JsonProperty("V4") @Builder.Default private Double v4 = 0.0;
    @JsonProperty("V5") @Builder.Default private Double v5 = 0.0;
    @JsonProperty("V6") @Builder.Default private Double v6 = 0.0;
    @JsonProperty("V7") @Builder.Default private Double v7 = 0.0;
    @JsonProperty("V8") @Builder.Default private Double v8 = 0.0;
    @JsonProperty("V9") @Builder.Default private Double v9 = 0.0;
    @JsonProperty("V10") @Builder.Default private Double v10 = 0.0;
    @JsonProperty("V11") @Builder.Default private Double v11 = 0.0;
    @JsonProperty("V12") @Builder.Default private Double v12 = 0.0;
    @JsonProperty("V13") @Builder.Default private Double v13 = 0.0;
    @JsonProperty("V14") @Builder.Default private Double v14 = 0.0;
    @JsonProperty("V15") @Builder.Default private Double v15 = 0.0;
    @JsonProperty("V16") @Builder.Default private Double v16 = 0.0;
    @JsonProperty("V17") @Builder.Default private Double v17 = 0.0;
    @JsonProperty("V18") @Builder.Default private Double v18 = 0.0;
    @JsonProperty("V19") @Builder.Default private Double v19 = 0.0;
    @JsonProperty("V20") @Builder.Default private Double v20 = 0.0;
    @JsonProperty("V21") @Builder.Default private Double v21 = 0.0;
    @JsonProperty("V22") @Builder.Default private Double v22 = 0.0;
    @JsonProperty("V23") @Builder.Default private Double v23 = 0.0;
    @JsonProperty("V24") @Builder.Default private Double v24 = 0.0;
    @JsonProperty("V25") @Builder.Default private Double v25 = 0.0;
    @JsonProperty("V26") @Builder.Default private Double v26 = 0.0;
    @JsonProperty("V27") @Builder.Default private Double v27 = 0.0;
    @JsonProperty("V28") @Builder.Default private Double v28 = 0.0;

    public static SentinelScoreRequest fromTransactionRequest(TransactionRequest request) {
        return SentinelScoreRequest.builder()
                .amount(request.getAmount())
                .v1(request.getV1())
                .v2(request.getV2())
                .v3(request.getV3())
                .v4(request.getV4())
                .v5(request.getV5())
                .v6(request.getV6())
                .v7(request.getV7())
                .v8(request.getV8())
                .v9(request.getV9())
                .v10(request.getV10())
                .v11(request.getV11())
                .v12(request.getV12())
                .v13(request.getV13())
                .v14(request.getV14())
                .v15(request.getV15())
                .v16(request.getV16())
                .v17(request.getV17())
                .v18(request.getV18())
                .v19(request.getV19())
                .v20(request.getV20())
                .v21(request.getV21())
                .v22(request.getV22())
                .v23(request.getV23())
                .v24(request.getV24())
                .v25(request.getV25())
                .v26(request.getV26())
                .v27(request.getV27())
                .v28(request.getV28())
                .build();
    }
}
