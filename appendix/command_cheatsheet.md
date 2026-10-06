## Phụ lục E: Sổ tay tra cứu lệnh nhanh

Phụ lục này tổng hợp toàn bộ các câu lệnh CLI trong terminal và các câu lệnh gạch chéo (Slash commands) trong khung chat của OpenClaw phục vụ việc tra cứu nhanh hàng ngày. Các tham số lệnh có thể thay đổi nhẹ giữa các phiên bản, hãy căn cứ theo `openclaw <lệnh> --help`.

> Bảng này bao phủ các lệnh CLI được nhắc đến trong các chương của cuốn sách. Cần phân biệt: Các đường dẫn trong [Mục 3.1](../03_minimal_loop/3.1_control_ui_webchat.md) như `/chat`, `/overview`, `/sessions`, `/cron`, `/agents` là **đường dẫn trang (Page Routes)** của Control UI, không phải lệnh gạch chéo trong chat.

### E.1 Thao tác cơ sở & Quản lý dịch vụ

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw --version` | Xem số hiệu phiên bản hiện tại | [2.1](../02_setup/2.1_requirements.md) |
| `openclaw --help` | Xem danh sách toàn bộ lệnh khả dụng và cách dùng | — |
| `openclaw tui` | Mở giao diện trò chuyện dòng lệnh TUI | [2.3](../02_setup/2.3_onboarding.md) |
| `openclaw dashboard` | Mở bảng điều khiển Web Control UI trên trình duyệt | [3.1](../03_minimal_loop/3.1_control_ui_webchat.md) |
| `openclaw gateway restart` | Khởi động lại dịch vụ Gateway (dùng sau khi đổi cấu hình) | [4.1](../04_config_models/4.1_config_system.md) |
| `openclaw gateway stop` | Dừng dịch vụ Gateway; không dùng làm bước đầu của khởi động lại | — |
| `openclaw update` | Cập nhật hệ thống lên phiên bản mới nhất | [2.2](../02_setup/2.2_installation.md) |
| `openclaw update status` | Xem trạng thái cài đặt và cập nhật hiện tại | [2.2](../02_setup/2.2_installation.md) |
| `openclaw update --dry-run` | Xem thử tiến trình cập nhật trước mà không cài đặt thực tế | [2.2](../02_setup/2.2_installation.md) |
| `openclaw update --channel stable` | Chuyển sang kênh phát hành ổn định (Stable) và cập nhật | [2.2](../02_setup/2.2_installation.md) |
| `openclaw update --channel beta` | Chuyển sang kênh thử nghiệm (Beta) và cập nhật | [2.2](../02_setup/2.2_installation.md) |
| `openclaw update --channel dev` | Chuyển sang kênh phát triển (Dev) và cập nhật | [2.2](../02_setup/2.2_installation.md) |

### E.2 Cài đặt, Khởi tạo & Cấu hình

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw setup` | Khởi tạo tệp cấu hình, workspace và thư mục phiên | [2.3](../02_setup/2.3_onboarding.md) |
| `openclaw onboard` | Khởi động wizard hướng dẫn cấu hình tương tác | [2.3](../02_setup/2.3_onboarding.md) |
| `openclaw setup --wizard` | Đi vào wizard tương tác từ lối vào `setup` | [2.3](../02_setup/2.3_onboarding.md) |
| `openclaw onboard --install-daemon` | Hướng dẫn cấu hình + Cài đặt dịch vụ nền hệ thống (Daemon) | [2.3](../02_setup/2.3_onboarding.md) |
| `openclaw configure` | Mở lại wizard để sửa đổi cài đặt bất cứ lúc nào | [2.3](../02_setup/2.3_onboarding.md) |
| `openclaw config file` | Xem đường dẫn tệp cấu hình hiện tại đang được sử dụng | [4.1](../04_config_models/4.1_config_system.md) |
| `openclaw config get <đường_dẫn>` | Đọc giá trị hiện tại của một mục cấu hình cụ thể | [4.1](../04_config_models/4.1_config_system.md) |
| `openclaw config set <đường_dẫn> <giá_trị>` | Cập nhật giá trị mục cấu hình không qua giao diện tương tác | [4.1](../04_config_models/4.1_config_system.md) |
| `openclaw config unset <đường_dẫn>` | Xóa một mục cấu hình cụ thể (dùng khi dọn trường cũ) | [4.1](../04_config_models/4.1_config_system.md) |
| `openclaw config validate` | Xác thực cấu trúc tệp cấu hình và tính hợp lệ của trường | [4.1](../04_config_models/4.1_config_system.md) |
| `openclaw config schema` | Xem JSON Schema cấu hình của phiên bản hiện tại | [4.1](../04_config_models/4.1_config_system.md) |

### E.3 Chẩn đoán & Xử lý sự cố

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw doctor` | Khám sức khỏe toàn diện (Cấu hình, cổng, phụ thuộc) | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw doctor --repair` | Khám sức khỏe + Tự động sửa chữa theo khuyến nghị | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw health --json` | Đầu dò sức khỏe hệ thống (Dành cho tự động hóa) | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw status` | Xem trạng thái vận hành cơ bản (Gateway có online không, cổng...) | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw status --deep` | Xem trạng thái chi tiết kèm live probe các kênh chat | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw status --usage` | Bản chụp hạn mức / cửa sổ tiêu thụ của provider | [14.3](../14_performance_cost/14.3_usage_budget.md) |
| `openclaw status --all` | Xuất tổng hợp toàn bộ các nhóm trạng thái trong một màn hình | [15.1](../15_troubleshooting_trees/15.1_diagnostic_decision_trees.md) |
| `openclaw logs` | Xem các dòng nhật ký log gần nhất | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw logs --follow --json` | Theo dõi liên tục nhật ký log có cấu trúc dạng JSON | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw logs --limit <N> --json` | Lấy bản chụp N dòng log phục vụ kiểm tra | [Phụ lục C](troubleshooting_checklist.md) |
| `openclaw gateway probe` | Chủ động thăm dò khả năng kết nối tới Gateway | [15.1](../15_troubleshooting_trees/15.1_diagnostic_decision_trees.md) |
| `openclaw gateway stability --json` | Bản chụp tính ổn định Gateway (sập, restart, bão hòa) | [15.2](../15_troubleshooting_trees/15.2_high_concurrency_diagnosis.md) |
| `openclaw gateway stability --bundle latest --export` | Xuất gói sự cố ổn định gần nhất | [15.2](../15_troubleshooting_trees/15.2_high_concurrency_diagnosis.md) |
| `openclaw gateway diagnostics export --json` | Xuất gói chẩn đoán có kiểm soát để gửi Issue | [Phụ lục C](troubleshooting_checklist.md) |
| `openclaw proxy validate` | Xác thực đường dẫn runtime của proxy được quản lý | [Phụ lục H](env_check.md) |
| `openclaw security audit` | Kiểm toán đường cơ sở an toàn (ai được chat, thực thi ở đâu...) | [8.5](../08_automation_ops/8.5_security_baseline.md) |
| `openclaw security audit --deep` | Kiểm toán an toàn chuyên sâu (live probes + plugin collector) | [8.5](../08_automation_ops/8.5_security_baseline.md) |
| `openclaw security audit --fix` | Kiểm toán an toàn kèm tự động sửa chữa | [8.5](../08_automation_ops/8.5_security_baseline.md) |

### E.4 Quản lý Mô hình AI

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw models list` | Liệt kê toàn bộ các mô hình đã được cấu hình | [4.3](../04_config_models/4.3_model_selection.md) |
| `openclaw models set <provider/model>` | Chuyển đổi mô hình chính mặc định | [4.3](../04_config_models/4.3_model_selection.md) |
| `openclaw models status` | Kiểm tra cấu hình và trạng thái xác thực của mô hình | [4.2](../04_config_models/4.2_provider_access.md) |
| `openclaw models status --probe` | Đầu dò thăm dò live auth tới các nhà cung cấp | [4.2](../04_config_models/4.2_provider_access.md) |
| `openclaw models auth add` | Hướng dẫn tương tác thêm hồ sơ xác thực nhà cung cấp | [4.2](../04_config_models/4.2_provider_access.md) |
| `openclaw models auth setup-token --provider <tên>` | Khởi tạo quy trình thiết lập token cho nhà cung cấp | [4.2](../04_config_models/4.2_provider_access.md) |
| `openclaw models auth paste-token --provider <tên>` | Dán API Token xác thực trực tiếp | [4.2](../04_config_models/4.2_provider_access.md) |

### E.5 Quản lý Kênh liên lạc (Channels)

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw channels list` | Liệt kê các kênh chat đã cấu hình | [7.1](../07_multi_agent/7.1_telegram_whatsapp.md) |
| `openclaw channels status --probe` | Thăm dò chủ động trạng thái đường truyền của kênh | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw channels capabilities` | Xem năng lực, cấu hình và cổng kết nối của kênh | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw channels add` | Thêm kênh chat mới qua wizard tương tác | [7.1](../07_multi_agent/7.1_telegram_whatsapp.md) |
| `openclaw channels add --channel telegram --token <TOKEN>` | Thêm kênh Telegram trực tiếp qua tham số dòng lệnh | [7.1](../07_multi_agent/7.1_telegram_whatsapp.md) |
| `openclaw channels remove --channel <tên>` | Gỡ bỏ một kênh chat khỏi hệ thống | [7.1](../07_multi_agent/7.1_telegram_whatsapp.md) |
| `openclaw channels logs` | Xem nhật ký log chuyên biệt của các kênh chat | [3.2](../03_minimal_loop/3.2_diagnostics.md) |
| `openclaw channels login` | Đăng nhập tài khoản kênh (như quét mã WhatsApp Web) | [7.1](../07_multi_agent/7.1_telegram_whatsapp.md) |
| `openclaw channels logout` | Đăng xuất tài khoản kênh | [7.1](../07_multi_agent/7.1_telegram_whatsapp.md) |

### E.6 Plugin & Kỹ năng (Skills)

**Quản lý Plugin**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw plugins list` | Liệt kê toàn bộ các plugin trong hệ thống | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `openclaw plugins install <spec>` | Cài đặt plugin từ npm, ClawHub, Git hoặc đường dẫn local | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `openclaw plugins enable <tên_plugin>` | Kích hoạt plugin | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `openclaw plugins disable <tên_plugin>` | Vô hiệu hóa plugin | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `openclaw plugins inspect <tên_plugin>` | Xem chi tiết nguồn gốc và manifest của plugin | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `openclaw plugins inspect <id> --runtime --json` | Xem trạng thái runtime của plugin (đã nạp, bật, sức khỏe) | [5.1](../05_tools_skills/5.1_tool_inventory.md) |
| `openclaw plugins update <spec>` | Cập nhật một plugin đã theo dõi | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `openclaw plugins update --all` | Cập nhật toàn bộ các plugin | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `openclaw plugins marketplace list <chợ>` | Xem danh sách plugin trên chợ | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `openclaw plugins doctor` | Kiểm tra các lỗi nạp và xung đột của plugin | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |

**Quản lý Kỹ năng (Skills)**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw skills search <từ_khóa>` | Tìm kiếm ngữ nghĩa kỹ năng trên kho ClawHub | [5.3](../05_tools_skills/5.3_skills_plugins.md) |
| `openclaw skills list` | Liệt kê các kỹ năng đã cài đặt trong workspace | [5.3](../05_tools_skills/5.3_skills_plugins.md) |
| `openclaw skills install <tên_skill>` | Cài đặt kỹ năng vào workspace | [5.3](../05_tools_skills/5.3_skills_plugins.md) |
| `openclaw skills update <tên_skill>` / `--all` | Cập nhật một hoặc toàn bộ kỹ năng | [5.3](../05_tools_skills/5.3_skills_plugins.md) |

### E.7 Quản trị Gateway

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw gateway start` | Khởi động Gateway chạy nền | [2.4](../02_setup/2.4_gateway_service.md) |
| `openclaw gateway run --port <cổng>` | Khởi động Gateway ở tiền cảnh (Foreground) với cổng chỉ định | [2.4](../02_setup/2.4_gateway_service.md) |
| `openclaw gateway run --verbose` | Khởi động tiền cảnh kèm log chi tiết | [2.4](../02_setup/2.4_gateway_service.md) |
| `openclaw gateway status` | Xem trạng thái hiện tại của Gateway | [2.4](../02_setup/2.4_gateway_service.md) |
| `openclaw gateway status --deep --require-rpc` | Xác nhận Gateway runtime sẵn sàng (Dùng khi nghiệm thu tool) | [5.1](../05_tools_skills/5.1_tool_inventory.md) |
| `openclaw gateway install` | Cài đặt dịch vụ Gateway có giám sát (Daemon) | [2.4](../02_setup/2.4_gateway_service.md) |
| `openclaw gateway uninstall` | Gỡ bỏ dịch vụ Gateway có giám sát | [2.4](../02_setup/2.4_gateway_service.md) |
| `openclaw gateway restart` | Khởi động lại dịch vụ Gateway | [2.4](../02_setup/2.4_gateway_service.md) |
| `openclaw gateway stop --disable` | Dừng và vô hiệu hóa vĩnh viễn tính năng tự chạy lại của daemon | [2.4](../02_setup/2.4_gateway_service.md) |

### E.8 Hộp cát (Sandbox) & Trình duyệt (Browser)

**Quản lý Hộp cát Sandbox**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw sandbox explain` | Xem trạng thái giải thích cấu hình sandbox hiện tại | [11.4](../11_reliability_security/11.4_guardrails.md) |
| `openclaw sandbox explain --json` | Xem cấu hình sandbox dưới định dạng JSON | [11.4](../11_reliability_security/11.4_guardrails.md) |
| `openclaw sandbox list` | Liệt kê toàn bộ container sandbox đang chạy | [11.4](../11_reliability_security/11.4_guardrails.md) |
| `openclaw sandbox list --browser` | Chỉ liệt kê các container trình duyệt | [11.4](../11_reliability_security/11.4_guardrails.md) |
| `openclaw sandbox recreate --all` | Dựng lại toàn bộ container | [11.4](../11_reliability_security/11.4_guardrails.md) |
| `openclaw sandbox recreate --all --force` | Cưỡng bức dựng lại (Xóa bỏ runtime cũ) | [11.4](../11_reliability_security/11.4_guardrails.md) |

**Điều khiển Trình duyệt (Browser)**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw browser status` | Xem trạng thái dịch vụ trình duyệt và node | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser start` | Khởi động dịch vụ trình duyệt | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser doctor` | Khám sức khỏe toàn diện chuỗi trình duyệt | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser open <URL>` | Mở trang web chỉ định | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser snapshot` | Lấy bản chụp snapshot DOM của trang web hiện tại | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser screenshot` | Chụp ảnh màn hình trang web | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser click <ref>` | Bấm chuột vào phần tử được tham chiếu trong snapshot | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser type <ref> "văn bản"` | Nhập văn bản vào ô nhập liệu tham chiếu | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser stop` | Dừng dịch vụ trình duyệt | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser close <tab>` | Đóng thẻ trình duyệt chỉ định | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser console` | Xem nhật ký console của trình duyệt | [5.4](../05_tools_skills/5.4_browser_nodes.md) |
| `openclaw browser evaluate` | Thực thi mã JavaScript trên trang (Cẩn trọng rủi ro prompt injection) | [5.4](../05_tools_skills/5.4_browser_nodes.md) |

### E.9 Tin nhắn & Ghép nối (Pairing)

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw message send --target <số/id> --message "nội dung"` | Gửi tin nhắn chủ động tới mục tiêu chỉ định | [7.1](../07_multi_agent/7.1_telegram_whatsapp.md) |
| `openclaw agent --agent <agentId> --message "tác vụ"` | Trực tiếp giao việc cho một Agent cụ thể | [7.3](../07_multi_agent/7.3_routing_basics.md) |
| `openclaw agents list` | Liệt kê toàn bộ các Agent và trạng thái bật/tắt | [15.1](../15_troubleshooting_trees/15.1_diagnostic_decision_trees.md) |
| `openclaw agents list --bindings` | Liệt kê các Agent kèm theo ràng buộc định tuyến | [7.4](../07_multi_agent/7.4_collaboration_patterns.md) |
| `openclaw agents bindings` | Xem toàn bộ các quy tắc ràng buộc định tuyến | [7.3](../07_multi_agent/7.3_routing_basics.md) |
| `openclaw agents bindings --agent <agentId>` | Xem chi tiết ràng buộc của một Agent cụ thể | [7.3](../07_multi_agent/7.3_routing_basics.md) |

**Ghép nối tin nhắn riêng (DM Pairing)**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw pairing list <kênh>` | Liệt kê các yêu cầu ghép nối đang chờ trên kênh | [3.4](../03_minimal_loop/3.4_pairing_groups.md) |
| `openclaw pairing approve <kênh> <mã_ghép_nối>` | Phê duyệt mã ghép nối tin nhắn riêng | [9.5](../09_gateway_protocol/9.5_pairing_trust.md) |
| `openclaw pairing approve <kênh> <mã> --notify` | Phê duyệt và thông báo cho đối phương | [7.1](../07_multi_agent/7.1_telegram_whatsapp.md) |

**Ghép nối thiết bị Control UI & Node** (Phân biệt với ghép nối kênh ở trên)

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw devices list` | Xem danh sách thiết bị và yêu cầu đang chờ phê duyệt | [3.1](../03_minimal_loop/3.1_control_ui_webchat.md) |
| `openclaw devices approve <requestId>` | Phê duyệt thiết bị đang chờ kết nối | [3.1](../03_minimal_loop/3.1_control_ui_webchat.md) |
| `openclaw devices remove <deviceId>` | Xóa bỏ thiết bị đã ghép nối | [3.4](../03_minimal_loop/3.4_pairing_groups.md) |
| `openclaw devices revoke --device <deviceId> --role <role>` | Thu hồi token vai trò chỉ định của thiết bị | [3.4](../03_minimal_loop/3.4_pairing_groups.md) |

### E.10 Tự động hóa & Vận hành (Automations & Ops)

**Tác vụ định kỳ (Cron)**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw cron add --name <tên> --cron "<biểu_thức>" --session main --system-event "<nội dung>" --wake now` | Tạo tác vụ cron phiên chính và đánh thức nhịp tim ngay | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `openclaw cron add --name <tên> --at "<thời_gian>" --session isolated --message "<nội dung>" --announce` | Tạo tác vụ cách ly một lần và chủ động chuyển phát kết quả | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `openclaw cron list` | Xem toàn bộ các tác vụ định kỳ đã đăng ký | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `openclaw cron status` | Xem trạng thái sức khỏe của bộ điều phối cron | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `openclaw cron show <jobId>` | Xem chi tiết một tác vụ | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `openclaw cron run <jobId>` | Ép chạy tác vụ ngay lập tức | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `openclaw cron enable <jobId>` / `disable <jobId>` | Kích hoạt / Tạm dừng tác vụ | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `openclaw cron runs --id <jobId>` | Xem lịch sử các lượt chạy thực tế của tác vụ | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `openclaw cron remove <jobId>` | Xóa bỏ tác vụ khỏi hệ thống | [8.2](../08_automation_ops/8.2_cron_jobs.md) |

**Nhịp tim (Heartbeat) & Sự kiện hệ thống**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw system event --text "<nội dung>" --mode now` | Bơm sự kiện hệ thống và đánh thức nhịp tim ngay | [8.3](../08_automation_ops/8.3_heartbeat.md) |
| `openclaw system event --text "<nội dung>" --mode next-heartbeat` | Bơm sự kiện hệ thống, đợi chu kỳ nhịp tim tới xử lý | [8.3](../08_automation_ops/8.3_heartbeat.md) |

**Quản lý Hooks**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw hooks list` | Liệt kê các Hook có thể phát hiện và trạng thái bật/tắt | [8.1](../08_automation_ops/8.1_hooks.md) |
| `openclaw hooks info <hook>` | Xem chi tiết và nguồn gốc của một Hook | [8.1](../08_automation_ops/8.1_hooks.md) |
| `openclaw hooks check` | Kiểm tra định nghĩa và lỗi nạp của Hook | [8.1](../08_automation_ops/8.1_hooks.md) |
| `openclaw hooks enable <hook>` / `disable <hook>` | Bật / Tắt một Hook chỉ định | [8.1](../08_automation_ops/8.1_hooks.md) |

**Đường ống quản lý khóa bí mật (Secrets)**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw secrets audit` | Kiểm toán tham chiếu và phụ thuộc chứng thư bí mật | [8.5](../08_automation_ops/8.5_security_baseline.md) |
| `openclaw secrets configure` | Cấu hình tương tác secrets provider và `SecretRef` | [Phụ lục F](version_mapping.md) |
| `openclaw secrets reload` | Nạp lại chứng thư bí mật mà không cần khởi động lại Gateway | [8.5](../08_automation_ops/8.5_security_baseline.md) |

**Bảo trì Phiên & Chi phí**

| Câu lệnh | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `openclaw sessions cleanup --dry-run` | Xem thử danh sách phiên hết hạn sẽ bị dọn dẹp | [14.3](../14_performance_cost/14.3_usage_budget.md) |
| `openclaw sessions cleanup --enforce` | Thực thi dọn dẹp các phiên hết hạn trên đĩa | [14.3](../14_performance_cost/14.3_usage_budget.md) |
| `openclaw gateway usage-cost` | Bản tóm tắt chi phí CLI dựa trên transcript | [14.1](../14_performance_cost/14.1_token_context_cost.md) |

### E.11 Các câu lệnh gạch chéo trong khung chat (Slash Commands)

Sử dụng trực tiếp bên trong cửa sổ trò chuyện (Control UI chat, Lark, Telegram...):

**Quản lý phiên**

| Lệnh gạch chéo | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `/new` | Bắt đầu phiên hội thoại mới (Xóa ngữ cảnh) | [6.1](../06_context_memory/6.1_sessions.md) |
| `/reset` | Đặt lại phiên: Tạo sessionId mới cho sessionKey hiện tại, giữ nguyên file bộ nhớ trên đĩa | [6.1](../06_context_memory/6.1_sessions.md) |
| `/compact` | Nén ngữ cảnh hiện tại (Giữ lại ý chính, thu hồi Token) | [6.4](../06_context_memory/6.4_compaction_pruning.md) |
| `/btw <câu hỏi>` | Đặt câu hỏi phụ rẽ nhánh, không ảnh hưởng đến ngữ cảnh tiếp theo | — |
| `/status` | Xem trạng thái phiên hiện tại (Lượng Token, model...) | [6.1](../06_context_memory/6.1_sessions.md) |
| `/help` hoặc `/commands` | Xem toàn bộ các câu lệnh gạch chéo khả dụng | — |

**Chuyển đổi mô hình**

| Lệnh gạch chéo | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `/model` | Xem mô hình AI hiện đang phục vụ phiên này | [4.3](../04_config_models/4.3_model_selection.md) |
| `/model <tên_model>` | Chuyển đổi sang mô hình chỉ định | [4.3](../04_config_models/4.3_model_selection.md) |

**Tác vụ, Ngữ cảnh & Xuất dữ liệu**

| Lệnh gạch chéo | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `/tasks` | Xem các tác vụ chạy ngầm liên quan đến phiên hiện tại | [7.4](../07_multi_agent/7.4_collaboration_patterns.md) |
| `/context [list\|detail\|json]` | Xem các thành phần cấu thành ngữ cảnh của phiên hiện tại | [6.2](../06_context_memory/6.2_context_building.md) |
| `/export-session [path]` | Xuất bản ghi phiên ra tệp HTML | [6.1](../06_context_memory/6.1_sessions.md) |

**Kiểm soát công cụ & Thực thi**

| Lệnh gạch chéo | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `/approve <id> <decision>` | Xử lý yêu cầu phê duyệt con người đang chờ | [5.2](../05_tools_skills/5.2_tool_policy.md) |
| `/allowlist` | Xem hoặc cập nhật danh sách trắng của phiên | [5.2](../05_tools_skills/5.2_tool_policy.md) |
| `/tools` / `/tools verbose` | Xem danh mục công cụ thực tế khả dụng của session hiện tại | [5.1](../05_tools_skills/5.1_tool_inventory.md) |
| `/queue collect [debounce:<thời_lượng>] [cap:<số_tin>]` | Điều chỉnh tạm thời hành vi hàng đợi gộp tin nhắn của phiên | [7.4](../07_multi_agent/7.4_collaboration_patterns.md) |
| `/queue reset` | Khôi phục hành vi hàng đợi mặc định | [7.4](../07_multi_agent/7.4_collaboration_patterns.md) |
| `/trace on` | Bật trace chẩn đoán cho công cụ và plugin | [14.2](../14_performance_cost/14.2_latency_throughput.md) |
| `/diagnostics [mô tả]` | Xuất gói chẩn đoán có kiểm soát ngay trong khung chat | [Phụ lục C](troubleshooting_checklist.md) |
| `/usage [off\|tokens\|full]` | Bật/tắt bản tóm tắt tiêu thụ Token ở chân mỗi tin nhắn phản hồi | [14.3](../14_performance_cost/14.3_usage_budget.md) |

**Kỹ năng & Plugin**

| Lệnh gạch chéo | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `/skill <tên> [đầu_vào]` | Chạy một kỹ năng chỉ định theo tên | [5.3](../05_tools_skills/5.3_skills_plugins.md) |
| `/plugins install\|enable\|disable` | Cài đặt hoặc bật/tắt plugin | [12.1](../12_extension_engineering/12.1_plugin_architecture.md) |
| `/usage cost` | Xem bản tóm tắt chi phí của phiên hiện tại | [14.3](../14_performance_cost/14.3_usage_budget.md) |

### E.12 Tra cứu các đường dẫn tệp tin trọng yếu

Bảng sử dụng đường dẫn workspace mặc định `~/.openclaw/workspace/`.

| Đường dẫn tệp tin | Diễn giải chức năng | Chương liên quan |
|---|---|---|
| `~/.openclaw/openclaw.json` | Tệp cấu hình chính của hệ thống | [4.1](../04_config_models/4.1_config_system.md) |
| `~/.openclaw/workspace/` | Thư mục không gian làm việc mặc định | [2.3.3](../02_setup/2.3_onboarding.md) |
| `~/.openclaw/workspace/AGENTS.md` | Chỉ thị thường trực và trang chủ của workspace | [2.3.3](../02_setup/2.3_onboarding.md) |
| `~/.openclaw/workspace/SOUL.md` | Định nghĩa nhân cách, phong cách giao tiếp của Agent | [3.3.2](../03_minimal_loop/3.3_agent_persona.md) |
| `~/.openclaw/workspace/USER.md` | Hồ sơ và sở thích của người dùng | [2.3.3](../02_setup/2.3_onboarding.md) |
| `~/.openclaw/workspace/IDENTITY.md` | Metadata định danh của Agent (Tên, hình ảnh đại diện) | [2.3.3](../02_setup/2.3_onboarding.md) |
| `~/.openclaw/workspace/TOOLS.md` | Ghi chú và hướng dẫn sử dụng công cụ cấp môi trường | [2.3.3](../02_setup/2.3_onboarding.md) |
| `~/.openclaw/workspace/HEARTBEAT.md` | Danh sách các mục tuần tra định kỳ của nhịp tim | [8.3](../08_automation_ops/8.3_heartbeat.md) |
| `~/.openclaw/workspace/BOOTSTRAP.md` | Kịch bản nghi thức chạy lần đầu (xóa sau khi hoàn thành) | [2.3.3](../02_setup/2.3_onboarding.md) |
| `~/.openclaw/workspace/MEMORY.md` | Tệp chỉ mục bộ nhớ dài hạn tùy chọn | [6.3](../06_context_memory/6.3_memory_mechanism.md) |
| `~/.openclaw/workspace/memory/` | Thư mục chứa các tệp nhật ký ghi nhớ hàng ngày | [6.3](../06_context_memory/6.3_memory_mechanism.md) |
| `<workspace>/skills/` | Thư mục kỹ năng cục bộ của workspace hiện tại | [5.3](../05_tools_skills/5.3_skills_plugins.md) |
| `~/.openclaw/agents/` | Thư mục dữ liệu và trạng thái của các Agent | — |
| `~/.openclaw/cron/jobs.json` | Nơi lưu trữ định nghĩa các tác vụ định kỳ cron | [8.2](../08_automation_ops/8.2_cron_jobs.md) |
| `~/.openclaw/agents/<ID>/sessions/` | Thư mục chứa bản ghi hội thoại và metadata phiên | [6.1](../06_context_memory/6.1_sessions.md) |

> Người dùng Windows lưu ý: Ký tự `~` tương đương với biến môi trường `%USERPROFILE%`, thông thường là `C:\Users\<Tên_người_dùng_của_bạn>`.
