"use client";

export default function ToggleButton({ roomId, isAvailable }: { roomId: string; isAvailable: boolean }) {
  const toggleStatus = async () => {
    try {
      const res = await fetch(`/api/toggle-room-availability`, {
        method: "POST",
        body: JSON.stringify({ roomId }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        window.location.reload(); // Reload page after updating status
      } else {
        console.error("Failed to update room status");
      }
    } catch (error) {
      console.error("Error toggling room status:", error);
    }
  };

  return (
    <button
      onClick={toggleStatus}
      className={`w-full py-2 rounded-lg text-white ${isAvailable ? "bg-red-500" : "bg-green-500"}`}
    >
      {isAvailable ? "เปลี่ยนเป็นเต็ม" : "เปลี่ยนเป็นว่าง"}
    </button>
  );
}
