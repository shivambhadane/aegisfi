package com.aegisfi.api_gateway.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionRequest {
    private Double amount;
    @Builder.Default private String currency = "USD";
    
    @Builder.Default private Double v1 = 0.0;
    @Builder.Default private Double v2 = 0.0;
    @Builder.Default private Double v3 = 0.0;
    @Builder.Default private Double v4 = 0.0;
    @Builder.Default private Double v5 = 0.0;
    @Builder.Default private Double v6 = 0.0;
    @Builder.Default private Double v7 = 0.0;
    @Builder.Default private Double v8 = 0.0;
    @Builder.Default private Double v9 = 0.0;
    @Builder.Default private Double v10 = 0.0;
    @Builder.Default private Double v11 = 0.0;
    @Builder.Default private Double v12 = 0.0;
    @Builder.Default private Double v13 = 0.0;
    @Builder.Default private Double v14 = 0.0;
    @Builder.Default private Double v15 = 0.0;
    @Builder.Default private Double v16 = 0.0;
    @Builder.Default private Double v17 = 0.0;
    @Builder.Default private Double v18 = 0.0;
    @Builder.Default private Double v19 = 0.0;
    @Builder.Default private Double v20 = 0.0;
    @Builder.Default private Double v21 = 0.0;
    @Builder.Default private Double v22 = 0.0;
    @Builder.Default private Double v23 = 0.0;
    @Builder.Default private Double v24 = 0.0;
    @Builder.Default private Double v25 = 0.0;
    @Builder.Default private Double v26 = 0.0;
    @Builder.Default private Double v27 = 0.0;
    @Builder.Default private Double v28 = 0.0;
}
