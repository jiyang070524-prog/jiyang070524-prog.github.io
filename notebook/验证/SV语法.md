---
layout: note
title: "SV语法"
category: "验证"
permalink: /study-notes/verification/sv-syntax/
hide_title: true
---

# sv基本示例
```
typedef struct packed{

}Ring_slot;

module mesh_stop #(parameter MY_Y = 0 MX_X = 0)
//使用parameter定义参数
	(input Ring_slot.......
	input logic .......
	output ........
	)
	wire/reg/logic //logic会自动判断
	always_comb begin //显示的写出组合了逻辑
		if
		else
	end
	always_ff @(poseedge clk)begin//时序逻辑
		if(reset)
			xxx <= EMPTY_RING_SLOT;
		end
	fifo #(.DATA_TYPE(Ring_slot)) VRxf(.reset(reset))
endmodule
```
# string

```
string str 
str = "abc"
str = {str , "cde"} //允许直接追加，初始化不涉及长度
//len（str）= 6  
```

# array
```
logic [7:0] a;
logic a[7:0]
logic [7:0] a [13:0] // 前面的8是一组八位 ，14代表十四组
//也就是在a前面的是packed,后面是unpacked
```


### 四态仿真
01 == 0x -> x
0x == 0x -> x
0x === 0x -> 1
01 === 0x -> 0
if(x) a else b ->b


