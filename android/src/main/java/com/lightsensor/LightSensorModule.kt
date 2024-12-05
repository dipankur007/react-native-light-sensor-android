package com.lightsensor

import android.hardware.Sensor
import android.content.Context
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule

@ReactModule(name = LightSensorModule.NAME)
class LightSensorModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), TurboModule {

  private val sensorManager: SensorManager = reactContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
  private var lightSensor: Sensor? = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)
  private var sensorListener: SensorEventListener? = null
  private var currentLightValue: Double? = null

  init {
    if (lightSensor == null) {
        // Handle case where light sensor is unavailable
    }
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun isSensorAvailable(promise: Promise) {
      promise.resolve(lightSensor != null)
  }

  @ReactMethod
  fun startListening() {
      lightSensor?.let { sensor ->
          sensorListener = object : SensorEventListener {
              override fun onSensorChanged(event: SensorEvent?) {
                  if (event != null && event.sensor.type == Sensor.TYPE_LIGHT) {
                      sendSensorValueToJS(event.values[0].toDouble())
                  }
              }

              override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
          }
          sensorManager.registerListener(sensorListener, sensor, SensorManager.SENSOR_DELAY_UI)
      }
  }

  @ReactMethod
  fun stopListening() {
      sensorListener?.let { sensorManager.unregisterListener(it) }
  }

  private fun sendSensorValueToJS(value: Double) {
      // Send the sensor value to JavaScript
      sendEvent(reactApplicationContext, "LightSensorChanged", value)
  }

  private fun sendEvent(reactContext: ReactApplicationContext, eventName: String, params: Any?) {
      reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          .emit(eventName, params)
  }

  companion object {
    const val NAME = "LightSensor"
  }
}
