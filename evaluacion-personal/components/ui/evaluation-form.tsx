"use client"

import type React from "react"

import { useState } from "react"
import { SignatureCanvas } from "@/components/ui/signature-canvas"
import { RatingScale } from "./rating-scale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function EvaluationForm() {
  const [formData, setFormData] = useState({
    idRH: "",
    nombre: "",
    puesto: "",
    departamento: "",
    fechaEvaluacion: "",
    nombreEvaluador: "",
    comentarios: "",
  })

  const [ratings, setRatings] = useState({
    proactivo: 0,
    identificaNecesidades: 0,
    amable: 0,
    sinConflictos: 0,
    lider: 0,
    aseoPersonal: 0,
    uniforme: 0,
    conocimientos: 0,
    rapido: 0,
    noErrores: 0,
    noPierdeTiempo: 0,
    puntual: 0,
  })

  const [employeeSignature, setEmployeeSignature] = useState<string | null>(null)
  const [evaluatorSignature, setEvaluatorSignature] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (name: string, value: number) => {
    setRatings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que se hayan completado todos los campos necesarios
    if (!employeeSignature || !evaluatorSignature) {
      alert("Por favor complete ambas firmas antes de enviar el formulario.")
      return
    }

    // Aquí se procesaría el envío del formulario con todos los datos
    console.log({
      formData,
      ratings,
      employeeSignature,
      evaluatorSignature,
    })

    alert("Formulario enviado con éxito")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Información personal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="idRH">ID RH:</Label>
          <Input id="idRH" name="idRH" value={formData.idRH} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre:</Label>
          <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="puesto">Puesto:</Label>
          <Input id="puesto" name="puesto" value={formData.puesto} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departamento">Departamento:</Label>
          <Input
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fechaEvaluacion">Fecha evaluación:</Label>
          <Input
            id="fechaEvaluacion"
            name="fechaEvaluacion"
            type="date"
            value={formData.fechaEvaluacion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nombreEvaluador">Nombre evaluador:</Label>
          <Input
            id="nombreEvaluador"
            name="nombreEvaluador"
            value={formData.nombreEvaluador}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <Separator />

      {/* Calidad en el servicio */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Calidad en el servicio:</h2>
          <div className="space-y-4">
            <RatingScale
              label="Es proactivo/a, se adelanta a los problemas y a las necesidades del cliente."
              name="proactivo"
              value={ratings.proactivo}
              onChange={(value) => handleRatingChange("proactivo", value)}
            />
            <RatingScale
              label="Identifica las necesidades del cliente, se adapta, es detallista en el servicio."
              name="identificaNecesidades"
              value={ratings.identificaNecesidades}
              onChange={(value) => handleRatingChange("identificaNecesidades", value)}
            />
            <RatingScale
              label="Sonríe, es amable, mira a los ojos al cliente, entabla conversación con el cliente."
              name="amable"
              value={ratings.amable}
              onChange={(value) => handleRatingChange("amable", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Relaciones humanas */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Relaciones humanas:</h2>
          <div className="space-y-4">
            <RatingScale
              label="No tiene conflictos con sus compañeros o superiores."
              name="sinConflictos"
              value={ratings.sinConflictos}
              onChange={(value) => handleRatingChange("sinConflictos", value)}
            />
            <RatingScale
              label="Es líder, influye en los demás, no tiene mando pero sabe mandar"
              name="lider"
              value={ratings.lider}
              onChange={(value) => handleRatingChange("lider", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Aspecto personal */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Aspecto personal:</h2>
          <div className="space-y-4">
            <RatingScale
              label="Aseo personal cuidado, nunca descuida afeitado, pelo recogido, adecuadamente maquillada."
              name="aseoPersonal"
              value={ratings.aseoPersonal}
              onChange={(value) => handleRatingChange("aseoPersonal", value)}
            />
            <RatingScale
              label="Siempre cuida su uniforme, siempre porta la placa de identificación, nunca se le ha llamado la atención por el tema del uniforme"
              name="uniforme"
              value={ratings.uniforme}
              onChange={(value) => handleRatingChange("uniforme", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Calidad de su trabajo */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Calidad de su trabajo:</h2>
          <div className="space-y-4">
            <RatingScale
              label="Tiene los conocimientos necesarios para desempeñar su trabajo."
              name="conocimientos"
              value={ratings.conocimientos}
              onChange={(value) => handleRatingChange("conocimientos", value)}
            />
            <RatingScale
              label="Es rápido/a, atiende o realiza su trabajo al ritmo adecuado."
              name="rapido"
              value={ratings.rapido}
              onChange={(value) => handleRatingChange("rapido", value)}
            />
            <RatingScale
              label="No comete errores, si los comete los subsana y no los oculta"
              name="noErrores"
              value={ratings.noErrores}
              onChange={(value) => handleRatingChange("noErrores", value)}
            />
            <RatingScale
              label="No pierde el tiempo, está disponible, cuando hay que trabajar siempre está, nunca habla por el celular o con compañeros en horario de trabajo."
              name="noPierdeTiempo"
              value={ratings.noPierdeTiempo}
              onChange={(value) => handleRatingChange("noPierdeTiempo", value)}
            />
            <RatingScale
              label="Es puntual, no tiene faltas de asistencia o retrasos en la entrada al trabajo."
              name="puntual"
              value={ratings.puntual}
              onChange={(value) => handleRatingChange("puntual", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Comentarios */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Comentarios:</h2>
          <Textarea
            name="comentarios"
            value={formData.comentarios}
            onChange={handleInputChange}
            rows={5}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Firmas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label>Firma del trabajador:</Label>
          <SignatureCanvas onSave={setEmployeeSignature} signature={employeeSignature} />
        </div>
        <div className="space-y-2">
          <Label>Firma del evaluador:</Label>
          <SignatureCanvas onSave={setEvaluatorSignature} signature={evaluatorSignature} />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button type="submit" className="px-8">
          Enviar Evaluación
        </Button>
      </div>
    </form>
  )
}

