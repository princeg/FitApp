/*
 * This file is auto-generated.  DO NOT MODIFY.
 * Original file: C:\\Users\\exingbo\\workspace\\PhoneGapPluginSampleApp\\src\\com\\dsi\\ant\\IServiceSettings.aidl
 */
package com.dsi.ant;
/**
 *
 * API for configuring the non-ANT components of the ANT Service. 
 *
 * {@hide}
 */
public interface IServiceSettings extends android.os.IInterface
{
/** Local-side IPC implementation stub class. */
public static abstract class Stub extends android.os.Binder implements com.dsi.ant.IServiceSettings
{
private static final java.lang.String DESCRIPTOR = "com.dsi.ant.IServiceSettings";
/** Construct the stub at attach it to the interface. */
public Stub()
{
this.attachInterface(this, DESCRIPTOR);
}
/**
 * Cast an IBinder object into an com.dsi.ant.IServiceSettings interface,
 * generating a proxy if needed.
 */
public static com.dsi.ant.IServiceSettings asInterface(android.os.IBinder obj)
{
if ((obj==null)) {
return null;
}
android.os.IInterface iin = (android.os.IInterface)obj.queryLocalInterface(DESCRIPTOR);
if (((iin!=null)&&(iin instanceof com.dsi.ant.IServiceSettings))) {
return ((com.dsi.ant.IServiceSettings)iin);
}
return new com.dsi.ant.IServiceSettings.Stub.Proxy(obj);
}
public android.os.IBinder asBinder()
{
return this;
}
@Override public boolean onTransact(int code, android.os.Parcel data, android.os.Parcel reply, int flags) throws android.os.RemoteException
{
switch (code)
{
case INTERFACE_TRANSACTION:
{
reply.writeString(DESCRIPTOR);
return true;
}
case TRANSACTION_debugLogging:
{
data.enforceInterface(DESCRIPTOR);
boolean _arg0;
_arg0 = (0!=data.readInt());
this.debugLogging(_arg0);
reply.writeNoException();
return true;
}
case TRANSACTION_setNumCombinedBurstPackets:
{
data.enforceInterface(DESCRIPTOR);
int _arg0;
_arg0 = data.readInt();
boolean _result = this.setNumCombinedBurstPackets(_arg0);
reply.writeNoException();
reply.writeInt(((_result)?(1):(0)));
return true;
}
case TRANSACTION_getNumCombinedBurstPackets:
{
data.enforceInterface(DESCRIPTOR);
int _result = this.getNumCombinedBurstPackets();
reply.writeNoException();
reply.writeInt(_result);
return true;
}
}
return super.onTransact(code, data, reply, flags);
}
private static class Proxy implements com.dsi.ant.IServiceSettings
{
private android.os.IBinder mRemote;
Proxy(android.os.IBinder remote)
{
mRemote = remote;
}
public android.os.IBinder asBinder()
{
return mRemote;
}
public java.lang.String getInterfaceDescriptor()
{
return DESCRIPTOR;
}
public void debugLogging(boolean debug) throws android.os.RemoteException
{
android.os.Parcel _data = android.os.Parcel.obtain();
android.os.Parcel _reply = android.os.Parcel.obtain();
try {
_data.writeInterfaceToken(DESCRIPTOR);
_data.writeInt(((debug)?(1):(0)));
mRemote.transact(Stub.TRANSACTION_debugLogging, _data, _reply, 0);
_reply.readException();
}
finally {
_reply.recycle();
_data.recycle();
}
}
public boolean setNumCombinedBurstPackets(int numPackets) throws android.os.RemoteException
{
android.os.Parcel _data = android.os.Parcel.obtain();
android.os.Parcel _reply = android.os.Parcel.obtain();
boolean _result;
try {
_data.writeInterfaceToken(DESCRIPTOR);
_data.writeInt(numPackets);
mRemote.transact(Stub.TRANSACTION_setNumCombinedBurstPackets, _data, _reply, 0);
_reply.readException();
_result = (0!=_reply.readInt());
}
finally {
_reply.recycle();
_data.recycle();
}
return _result;
}
public int getNumCombinedBurstPackets() throws android.os.RemoteException
{
android.os.Parcel _data = android.os.Parcel.obtain();
android.os.Parcel _reply = android.os.Parcel.obtain();
int _result;
try {
_data.writeInterfaceToken(DESCRIPTOR);
mRemote.transact(Stub.TRANSACTION_getNumCombinedBurstPackets, _data, _reply, 0);
_reply.readException();
_result = _reply.readInt();
}
finally {
_reply.recycle();
_data.recycle();
}
return _result;
}
}
static final int TRANSACTION_debugLogging = (android.os.IBinder.FIRST_CALL_TRANSACTION + 0);
static final int TRANSACTION_setNumCombinedBurstPackets = (android.os.IBinder.FIRST_CALL_TRANSACTION + 1);
static final int TRANSACTION_getNumCombinedBurstPackets = (android.os.IBinder.FIRST_CALL_TRANSACTION + 2);
}
public void debugLogging(boolean debug) throws android.os.RemoteException;
public boolean setNumCombinedBurstPackets(int numPackets) throws android.os.RemoteException;
public int getNumCombinedBurstPackets() throws android.os.RemoteException;
}
