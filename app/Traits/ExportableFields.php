<?php

namespace App\Traits;

trait ExportableFields
{
    public function toExportableArray(): array
    {
        $array = $this->toArray();
        $array['exportable'] = $this->getExportableFields($this->exportableFieldMap);
        if (isset($this->average_mark)) {
            $array['exportable']['Average Mark'] = $this->average_mark;
        }

        return $array;
    }

    public function getExportableFields(array $fieldMap): array
    {
        $exportable = [];

        foreach ($fieldMap as $label => $field) {
            $value = $this->getExportableValue($field);
            $exportable[$label] = $value;
        }

        return $exportable;
    }

    protected function getExportableValue($field)
    {
        if (str_contains($field, '.')) {
            return data_get($this, $field) ?? 'N/A';
        }

        if (in_array($field, $this->getDates()) && !empty($this->$field)) {
            return $this->$field->format('Y-m-d H:i:s');
        }

        return $this->$field ?? 'N/A';
    }
}
