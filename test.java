Task 1: Widest Vertical Path
โจทย์ย่อ

มีต้นไม้ N ต้น แต่ละต้นมีพิกัด (X,Y)

หาความกว้างของ ช่องว่างแนวตั้ง ที่กว้างที่สุดระหว่างต้นไม้

Y ไม่มีผล ใช้แค่ X

แนวคิด
Sort X
หา gap ระหว่าง X ที่ติดกัน
คืน gap ที่มากที่สุด
Code
import java.util.Arrays;

class Solution {
    public int solution(int[] X, int[] Y) {

        Arrays.sort(X);

        int ans = 0;

        for (int i = 1; i < X.length; i++) {
            ans = Math.max(ans, X[i] - X[i - 1]);
        }

        return ans;
    }
}

Complexity

O(N log N)
Task 2: Remove defective CSV rows
โจทย์ย่อ

Input เป็น CSV

header
1,Jack,NULL,12
17,Betty,28,11

ลบทั้งแถว ถ้ามีช่องไหนเป็น

NULL

เท่านั้น

null

ANNUL

ANNULL

ไม่ลบ

แนวคิด
split ตาม \n
header เก็บไว้
split แต่ละ row ด้วย ,
ถ้ามี NULL ข้าม
ไม่มีก็ append
Code
class Solution {

    public String solution(String S) {

        String[] rows = S.split("\n");

        StringBuilder ans = new StringBuilder();

        ans.append(rows[0]);

        for (int i = 1; i < rows.length; i++) {

            String[] cols = rows[i].split(",");

            boolean bad = false;

            for (String c : cols) {

                if (c.equals("NULL")) {
                    bad = true;
                    break;
                }
            }

            if (!bad) {
                ans.append("\n").append(rows[i]);
            }
        }

        return ans.toString();
    }
}

Complexity

O(N)
Task 3: Remove one character
โจทย์ย่อ

ลบตัวอักษร 1 ตัว

ให้ String ที่เหลือ Alphabetically Smallest

ตัวอย่าง

abc

ตอบ

ab
hot

ตอบ

ho
codility

ตอบ

cdility
แนวคิด

เจอตัวแรกที่

S[i] > S[i+1]

ลบตัวนั้น

ถ้าไม่มีเลย

ลบตัวสุดท้าย

Code
class Solution {

    public String solution(String S) {

        for (int i = 0; i < S.length() - 1; i++) {

            if (S.charAt(i) > S.charAt(i + 1)) {

                return S.substring(0, i)
                        + S.substring(i + 1);
            }
        }

        return S.substring(0, S.length() - 1);
    }
}

Complexity

O(N)
Cheat Sheet สำหรับสัมภาษณ์
ข้อ	Keyword	วิธีคิด	Complexity
Task 1	Widest Vertical Area	Sort X แล้วหา Max Gap	O(N log N)
Task 2	CSV Remove NULL Row	Split → Skip row ที่มี "NULL"	O(N)
Task 3	Remove One Character	ลบตัวแรกที่ s[i] > s[i+1] ไม่เจอให้ลบตัวท้าย	O(N)

ทั้ง 3 ข้อเป็นแนวที่เจอได้บ่อยใน Codility และ Live Coding สำหรับตำแหน่ง Software Engineer / Senior Developer ครับ।