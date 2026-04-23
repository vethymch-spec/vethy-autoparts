## 图片替换说明

### 目录结构
```
images/
├── category/          # 品类兜底图 (SVG 图标，已内置)
│   ├── filter.svg
│   ├── hydraulic.svg
│   ├── engine.svg
│   ├── undercarriage.svg
│   ├── cooling.svg
│   ├── seal.svg
│   └── electrical.svg
└── parts/             # 实拍图 (按 OE 号命名，放这里即自动替换)
    ├── 1R-0750.jpg
    ├── 600-319-3750.jpg
    └── ...
```

### 命名规则
- 文件名 = OE 号，特殊字符按下列替换：
  - `/` → `-`  (例: `320/04133` → `320-04133.jpg`)
  - 空格 → `_` (例: `VOE 11110683` → `VOE_11110683.jpg`)
- 建议 JPG 或 WEBP，尺寸 ≥ 600×600，底图白色或浅灰。

### 验证
丢进 `images/parts/` 后刷新 `index.html` 即可，加载失败会自动回退到品类 SVG。
