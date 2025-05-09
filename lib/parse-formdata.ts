import { IncomingForm } from "formidable";
import { Readable } from "stream";

// 👇 ใช้เพื่อจำลอง Request ที่มี headers
class NodeRequest extends Readable {
    constructor(private stream: Readable, public headers: Record<string, any>) {
        super();
        stream.on("data", (chunk) => this.push(chunk));
        stream.on("end", () => this.push(null));
    }

    _read() {
        // ไม่ต้องทำอะไร เพราะเราผลักข้อมูลจาก stream ด้านบน
    }
}

export function parseFormData(req: any): Promise<{ fields: any; files: any }> {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({ multiples: true, keepExtensions: true });

        // 👇 ถ้าเป็น Web Request ให้แปลง
        if (req.body && typeof req.body.getReader === "function") {
            const nodeReadable = Readable.fromWeb(req.body as any);
            const headers = Object.fromEntries(req.headers); // ดึง headers จาก NextRequest
            const simulatedReq = new NodeRequest(nodeReadable, headers); // จำลอง Node.js Request

            form.parse(simulatedReq as any, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        } else {
            // Node.js request ปกติ
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        }
    });
}
