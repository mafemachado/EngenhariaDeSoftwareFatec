import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar as CalendarIcon, Clock, Plus, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

// RF8: Controle de agenda médica
const DAYS_OF_WEEK = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HOURS = Array.from({ length: 13 }, (_, i) => `${String(8 + i).padStart(2, '0')}:00`);

type TimeSlot = {
  day: number;
  time: string;
  available: boolean;
};

export function MedicalSchedule() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { day: 1, time: "09:00", available: true },
    { day: 1, time: "10:00", available: true },
    { day: 1, time: "14:00", available: true },
    { day: 1, time: "15:00", available: true },
    { day: 2, time: "08:00", available: true },
    { day: 2, time: "09:00", available: true },
    { day: 2, time: "11:00", available: true },
    { day: 2, time: "16:00", available: true },
    { day: 3, time: "09:00", available: true },
    { day: 3, time: "13:00", available: true },
    { day: 3, time: "14:00", available: true },
    { day: 3, time: "15:00", available: true }
  ]);

  const [showAddSlots, setShowAddSlots] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);

  const nextMonth = new Date(selectedMonth);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const toggleAvailability = (day: number, time: string) => {
    setTimeSlots(prev =>
      prev.map(slot =>
        slot.day === day && slot.time === time
          ? { ...slot, available: !slot.available }
          : slot
      )
    );
    toast.success("Disponibilidade atualizada!");
  };

  const addTimeSlot = (day: number, time: string) => {
    const exists = timeSlots.some(slot => slot.day === day && slot.time === time);
    if (!exists) {
      setTimeSlots(prev => [...prev, { day, time, available: true }]);
    }
  };

  const removeTimeSlot = (day: number, time: string) => {
    setTimeSlots(prev => prev.filter(slot => !(slot.day === day && slot.time === time)));
    toast.success("Horário removido!");
  };

  const handleAddSlots = () => {
    if (selectedDay && selectedHours.length > 0) {
      selectedHours.forEach(time => {
        addTimeSlot(selectedDay, time);
      });
      toast.success(`${selectedHours.length} horários adicionados!`);
      setSelectedDay(null);
      setSelectedHours([]);
      setShowAddSlots(false);
    }
  };

  const toggleHourSelection = (hour: string) => {
    setSelectedHours(prev =>
      prev.includes(hour)
        ? prev.filter(h => h !== hour)
        : [...prev, hour]
    );
  };

  const getSlotsByDay = (day: number) => {
    return timeSlots.filter(slot => slot.day === day).sort((a, b) => a.time.localeCompare(b.time));
  };

  const daysInMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).getDay();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <CalendarIcon className="w-5 h-5 text-green-600" />
            Gerenciar Grade de Horários
          </CardTitle>
          <CardDescription>
            RF8: Configure seus períodos de atendimento para o próximo mês ({nextMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800">
                {nextMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
              </h3>
              <Button
                onClick={() => setShowAddSlots(!showAddSlots)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Horários
              </Button>
            </div>

            {showAddSlots && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="text-gray-800 mb-3">Adicionar Novos Horários</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-700 mb-2 block">Selecione o dia:</label>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                        <Button
                          key={day}
                          size="sm"
                          variant={selectedDay === day ? "default" : "outline"}
                          onClick={() => setSelectedDay(day)}
                          className={selectedDay === day ? "bg-green-600" : ""}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedDay && (
                    <div>
                      <label className="text-gray-700 mb-2 block">Selecione os horários:</label>
                      <div className="grid grid-cols-4 gap-2">
                        {HOURS.map(hour => (
                          <Button
                            key={hour}
                            size="sm"
                            variant={selectedHours.includes(hour) ? "default" : "outline"}
                            onClick={() => toggleHourSelection(hour)}
                            className={selectedHours.includes(hour) ? "bg-blue-600" : ""}
                          >
                            {hour}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddSlots(false)}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAddSlots}
                      disabled={!selectedDay || selectedHours.length === 0}
                      className="bg-gradient-to-r from-green-600 to-blue-600"
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Calendar Grid */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 bg-gray-100">
                {DAYS_OF_WEEK.map(day => (
                  <div key={day} className="p-2 text-center text-gray-700 border-r last:border-r-0">
                    {day.substring(0, 3)}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="border-r border-b p-2 bg-gray-50" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const slots = getSlotsByDay(day);

                  return (
                    <div
                      key={day}
                      className="border-r border-b p-2 min-h-[100px] hover:bg-green-50 transition-colors"
                    >
                      <div className="text-gray-800 mb-1">{day}</div>
                      <div className="space-y-1">
                        {slots.map(slot => (
                          <div
                            key={`${day}-${slot.time}`}
                            className="group relative"
                          >
                            <Badge
                              className={`cursor-pointer w-full justify-between ${
                                slot.available
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : "bg-gray-100 text-gray-500 border-gray-300"
                              }`}
                              onClick={() => toggleAvailability(day, slot.time)}
                            >
                              <Clock className="w-3 h-3" />
                              <span>{slot.time}</span>
                            </Badge>
                            <button
                              onClick={() => removeTimeSlot(day, slot.time)}
                              className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  <Clock className="w-3 h-3" />
                </Badge>
                <span>Disponível</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-100 text-gray-500 border-gray-300">
                  <Clock className="w-3 h-3" />
                </Badge>
                <span>Indisponível</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
