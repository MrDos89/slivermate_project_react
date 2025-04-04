import React, { useState } from "react";

const ScheduleItem = ({ item }) => {
  const isNotice = item.type === "공지";
  const [expanded, setExpanded] = useState(false);

  return (
    <li style={{ marginBottom: "20px" }}>
      <div
        style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "6px" }}
      >
        {isNotice ? "📢 " : "🧑‍🤝‍🧑 "}
        {item.title}
      </div>

      {isNotice ? (
        <div style={{ fontSize: "14px", color: "#666" }}>
          {item.content.length > 40 && !expanded
            ? item.content.slice(0, 40) + "..."
            : item.content}
          {item.content.length > 40 && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              style={{
                marginLeft: "6px",
                fontSize: "13px",
                color: "#00734f",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {expanded ? "접기" : "더보기"}
            </button>
          )}
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: "14px",
              color: "#888",
              marginBottom: "6px",
              lineHeight: "1.5",
            }}
          >
            🕒 {item.time} / 📍 {item.location || "미정"} / 💸{" "}
            {item.fee || "없음"}
          </div>

          <div style={{ fontSize: "14px", color: "#666" }}>
            {item.content.length > 30 && !expanded
              ? item.content.slice(0, 30) + "..."
              : item.content}
            {item.content.length > 30 && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                style={{
                  marginLeft: "6px",
                  fontSize: "13px",
                  color: "#00734f",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {expanded ? "접기" : "더보기"}
              </button>
            )}
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                padding: "6px 12px",
                marginRight: "10px",
                backgroundColor: "#e0f5e9",
                color: "#00734f",
                border: "1px solid #cce8db",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              참석
            </button>
            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "#ffecec",
                color: "#d34545",
                border: "1px solid #f5caca",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              불참
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default ScheduleItem;
